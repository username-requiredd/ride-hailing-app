'use client';

import { useEffect } from 'react';
import { useRideStore } from '@/store/ride';

export function MapRecenter() {
  const {
    mapInstance,
    pickupLocation,
    dropoffLocation,
    driverLocation,
    isFollowingDriver,
    rideStatus,
  } = useRideStore();

  // Effect for initial centering when ride is confirmed
  useEffect(() => {
    if (mapInstance && rideStatus === 'confirmed' && pickupLocation && dropoffLocation) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(pickupLocation);
      bounds.extend(dropoffLocation);
      mapInstance.fitBounds(bounds, 100); // 100px padding
    }
  }, [mapInstance, rideStatus, pickupLocation, dropoffLocation]);

  // Effect for following the driver
  useEffect(() => {
    if (mapInstance && isFollowingDriver && driverLocation) {
      mapInstance.panTo(driverLocation);
    }
  }, [mapInstance, isFollowingDriver, driverLocation]);

  return null; // This is a non-visual component
}
