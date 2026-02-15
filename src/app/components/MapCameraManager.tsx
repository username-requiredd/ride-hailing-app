'use client';

import { useEffect } from 'react';
import { useRideStore } from '@/store/ride';
import { useUberStyleDriverFollow } from '@/hooks/useUberStyleDriverFollow';

export function MapCameraManager() {
  const {
    mapInstance,
    pickupLocation,
    dropoffLocation,
    driverLocation,
    isFollowingDriver,
    rideStatus,
  } = useRideStore();

  // Hook for the Uber-style following behavior
  useUberStyleDriverFollow({
    mapInstance,
    driverLocation,
    isFollowingDriver,
    rideStatus,
  });

  // Effect for initial centering when ride is confirmed
  useEffect(() => {
    if (mapInstance && rideStatus === 'confirmed' && pickupLocation && dropoffLocation) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(pickupLocation);
      bounds.extend(dropoffLocation);
      mapInstance.fitBounds(bounds, 100); // 100px padding
    }
  }, [mapInstance, rideStatus, pickupLocation, dropoffLocation]);

  return null; // This is a non-visual component
}
