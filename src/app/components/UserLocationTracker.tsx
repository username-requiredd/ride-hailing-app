'use client';

import { useEffect } from 'react';
import { useRideStore } from '@/store/ride';

export function UserLocationTracker() {
  const {
    setUserCurrentLocation,
    setGeolocationError,
    setWatchId,
    watchId,
  } = useRideStore();

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeolocationError('Geolocation is not supported by your browser.');
      return;
    }

    // Get the initial position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting user location:", error);
        let errorMessage = 'An unknown error occurred while getting your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access was denied. Please enable it in your browser settings to use this feature.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Your location information is currently unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Getting your location timed out. Please try again.';
            break;
        }
        setGeolocationError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    // Start watching the user's position
    const newWatchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error watching user location:", error);
        // We don't want to show a persistent error for watch, as it can be temporary
      }
    );

    setWatchId(newWatchId);

    // Cleanup function to clear the watcher
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [setUserCurrentLocation, setGeolocationError, setWatchId]); // Removed watchId from dependencies to avoid re-running

  return null; // This is a non-visual component
}
