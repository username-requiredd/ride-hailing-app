'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRideStore } from '@/store/ride';
import { useDebounce } from '@/hooks/useDebounce';

interface LocationAutocompleteInputProps {
  onLocationSelect: (location: google.maps.LatLngLiteral, address: string) => void;
  type: 'pickup' | 'dropoff';
  initialValue?: string;
}

export function LocationAutocompleteInput({ onLocationSelect, type, initialValue = '' }: LocationAutocompleteInputProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSelectionCommitted, setIsSelectionCommitted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const debouncedInputValue = useDebounce(inputValue, 500);

  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const sessionToken = useRef<google.maps.places.AutocompleteSessionToken | undefined>(undefined);
  const maiduguriBounds = useRef<google.maps.LatLngBounds | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const { mapInstance } = useRideStore();

  useEffect(() => {
    if (mapInstance) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
      placesService.current = new google.maps.places.PlacesService(mapInstance);
      maiduguriBounds.current = new google.maps.LatLngBounds(
        new google.maps.LatLng(11.75, 13.05),
        new google.maps.LatLng(11.9, 13.25)
      );
    }
  }, [mapInstance]);

  useEffect(() => {
    if (debouncedInputValue && !isSelectionCommitted && autocompleteService.current && maiduguriBounds.current) {
      if (!sessionToken.current) {
        sessionToken.current = new google.maps.places.AutocompleteSessionToken();
      }
      autocompleteService.current.getPlacePredictions(
        {
          input: debouncedInputValue,
          bounds: maiduguriBounds.current,
          componentRestrictions: { country: 'ng' },
          sessionToken: sessionToken.current,
        },
        (predictions, status) => {
          setIsLoading(false);
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions);
            setIsDropdownOpen(true);
            setActiveIndex(-1);
          } else {
            setSuggestions([]);
            setIsDropdownOpen(false);
            if (status !== google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
              setError('Error fetching suggestions.');
            }
          }
        }
      );
    }
  }, [debouncedInputValue, isSelectionCommitted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsSelectionCommitted(false);
    setIsLoading(true);
    setError(null);
  };

  const handleSelectSuggestion = useCallback((placeId: string) => {
    if (!placesService.current) return;

    setIsSelectionCommitted(true);
    setIsDropdownOpen(false);
    setIsLoading(true);

    placesService.current.getDetails({ placeId, sessionToken: sessionToken.current }, (place, status) => {
      setIsLoading(false);
      if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location && place.formatted_address) {
        const location = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        onLocationSelect(location, place.formatted_address);
        setInputValue(place.formatted_address);
        setSuggestions([]);
        sessionToken.current = undefined;
      } else {
        setError('Could not retrieve location details.');
        setIsSelectionCommitted(false);
      }
    });
  }, [onLocationSelect]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDropdownOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && activeIndex > -1) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[activeIndex].place_id);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsDropdownOpen(false);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={componentRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={type === 'pickup' ? 'Enter pickup location' : 'Enter destination'}
        className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
        autoComplete="off"
      />
      {isDropdownOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-gray-800 rounded-md shadow-lg overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelectSuggestion(suggestion.place_id)}
              className={`p-3 cursor-pointer text-gray-300 ${
                index === activeIndex ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'
              }`}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
      {isLoading && <div className="p-2 text-sm text-gray-400">Loading...</div>}
      {error && <div className="p-2 text-sm text-red-500">{error}</div>}
    </div>
  );
}
