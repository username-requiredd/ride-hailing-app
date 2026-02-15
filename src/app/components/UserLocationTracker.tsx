'use client';

import { useEffect } from 'react';
import { useRideStore } from '@/store/ride';

export function UserLocationTracker() {
  const { setUserLocation, setGeolocationError } = useRideStore(
    (state) => ({
      setUserLocation: state.setUserLocation,
      setGeolocationError: state.setGeolocationError,
    })
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeolocationError('Geolocation is not supported by your browser.');
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      // Safety check as requested
      if (typeof setUserLocation === 'function') {
        setUserLocation({ lat: latitude, lng: longitude });
      } else {
        console.error('setUserLocation is missing or not a function');
      }
    };

    const handleError = (error: GeolocationPositionError) => {
      console.error('Error getting user location:', error);
      let errorMessage = 'An unknown error occurred while getting your location.';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage =
            'Location access was denied. Please enable it in your browser settings to use this feature.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Your location information is currently unavailable.';
          break;
        case error.TIMEOUT:
          errorMessage = 'Getting your location timed out. Please try again.';
          break;
      }
      setGeolocationError(errorMessage);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    // watchPosition is sufficient for initial and subsequent updates.
    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    );

    // Proper cleanup to clear the watcher on component unmount.
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [setUserLocation, setGeolocationError]);

  return null; // This is a non-visual component
}
