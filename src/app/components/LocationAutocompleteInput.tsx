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
  // == STATE MANAGEMENT ==
  const [inputValue, setInputValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSelectionCommitted, setIsSelectionCommitted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const debouncedInputValue = useDebounce(inputValue, 500);

  // == REFS FOR GOOGLE MAPS SERVICES ==
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const sessionToken = useRef<google.maps.places.AutocompleteSessionToken>();
  const maiduguriBounds = useRef<google.maps.LatLngBounds | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const { mapInstance, isGoogleMapsLoaded } = useRideStore();

  // == INITIALIZATION ==
  useEffect(() => {
    if (isGoogleMapsLoaded && mapInstance) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
      placesService.current = new google.maps.places.PlacesService(mapInstance);
      maiduguriBounds.current = new google.maps.LatLngBounds(
        new google.maps.LatLng(11.75, 13.05),
        new google.maps.LatLng(11.9, 13.25)
      );
      sessionToken.current = new google.maps.places.AutocompleteSessionToken();
    }
  }, [isGoogleMapsLoaded, mapInstance]);

  // == DEBOUNCED FETCHING LOGIC ==
  useEffect(() => {
    // Condition to fetch: there's input, a selection hasn't been made, and services are ready.
    if (debouncedInputValue && !isSelectionCommitted && autocompleteService.current) {
      setIsLoading(true);
      setError(null);

      autocompleteService.current.getPlacePredictions(
        {
          input: debouncedInputValue,
          bounds: maiduguriBounds.current,
          componentRestrictions: { country: 'ng' },
          strictBounds: true,
          sessionToken: sessionToken.current,
        },
        (predictions, status) => {
          setIsLoading(false);
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions);
            setIsDropdownOpen(true);
            setActiveIndex(-1); // Reset active index on new suggestions
          } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            setSuggestions([]);
            setIsDropdownOpen(false);
          } else {
            setError('Error fetching suggestions.');
            setSuggestions([]);
            setIsDropdownOpen(false);
          }
        }
      );
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  }, [debouncedInputValue, isSelectionCommitted]);

  // == EVENT HANDLERS ==
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsSelectionCommitted(false); // User is typing again, reset the commit flag
  };

  const handleSelectSuggestion = useCallback((placeId: string) => {
    if (!placesService.current) return;

    // Lock state to prevent race conditions
    setIsSelectionCommitted(true);
    setIsDropdownOpen(false);
    setIsLoading(true);

    placesService.current.getDetails({ placeId, sessionToken: sessionToken.current }, (place, status) => {
      setIsLoading(false);
      if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location && place.formatted_address) {
        const location = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        onLocationSelect(location, place.formatted_address);
        setInputValue(place.formatted_address); // Update input with final, formatted address
        setSuggestions([]); // Clear suggestions
        
        // Renew the session token for the next interaction
        sessionToken.current = new google.maps.places.AutocompleteSessionToken();
      } else {
        setError('Could not retrieve location details.');
        // If details fetch fails, allow user to try again
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

  // Close dropdown if clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isGoogleMapsLoaded) {
    return (
      <div className="w-full p-2 rounded-md bg-gray-800 text-gray-400">
        Loading mapping service...
      </div>
    );
  }

  // == JSX ==
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
