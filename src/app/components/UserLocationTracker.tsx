'use client';

import { useEffect } from 'react';
import { useRideStore } from '@/store/ride';

export function UserLocationTracker() {
  const { setUserCurrentLocation, setGeolocationError } = useRideStore();

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeolocationError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting user location:", error);
        setGeolocationError(`Error getting user location: ${error.message}. Please ensure you are on a secure (HTTPS) connection and have granted location permissions.`);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error watching user location:", error);
        setGeolocationError(`Error watching user location: ${error.message}.`);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [setUserCurrentLocation, setGeolocationError]);

  return null;
}
