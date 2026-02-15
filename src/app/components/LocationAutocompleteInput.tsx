'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRideStore } from '@/store/ride';
import { useDebounce } from '@/hooks/useDebounce';

interface LocationAutocompleteInputProps {
  onLocationSelect: (location: google.maps.LatLngLiteral) => void;
  type: 'pickup' | 'dropoff';
}

export function LocationAutocompleteInput({ onLocationSelect, type }: LocationAutocompleteInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedInputValue = useDebounce(inputValue, 500);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const maiduguriBounds = useRef<google.maps.LatLngBounds | null>(null);
  const { mapInstance, isGoogleMapsLoaded } = useRideStore();

  useEffect(() => {
    if (isGoogleMapsLoaded && mapInstance) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
      placesService.current = new google.maps.places.PlacesService(mapInstance);
      maiduguriBounds.current = new google.maps.LatLngBounds(
        new google.maps.LatLng(11.75, 13.05),
        new google.maps.LatLng(11.9, 13.25)
      );
    }
  }, [isGoogleMapsLoaded, mapInstance]);

  useEffect(() => {
    if (debouncedInputValue && autocompleteService.current && maiduguriBounds.current) {
      setIsLoading(true);
      setError(null);
      autocompleteService.current.getPlacePredictions(
        {
          input: debouncedInputValue,
          bounds: maiduguriBounds.current,
          componentRestrictions: { country: 'ng' },
          strictBounds: true,
        },
        (predictions, status) => {
          setIsLoading(false);
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions);
          } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            setSuggestions([]);
          } else {
            setError('Error fetching location suggestions.');
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  }, [debouncedInputValue]);

  const handleSuggestionClick = (placeId: string) => {
    if (placesService.current) {
      placesService.current.getDetails({ placeId }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
          const location = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
          onLocationSelect(location);
          setInputValue(place.formatted_address || '');
          setSuggestions([]);
        }
      });
    }
  };

  if (!isGoogleMapsLoaded) {
    return <div>Loading Google Maps...</div>; // Or a loading spinner
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={type === 'pickup' ? 'Enter pickup location' : 'Enter dropoff location'}
        className="w-full p-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isLoading && <div className="p-2">Loading...</div>}
      {error && <div className="p-2 text-red-500">{error}</div>}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-gray-800 rounded-md shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion.place_id)}
              className="p-2 cursor-pointer hover:bg-gray-700"
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
