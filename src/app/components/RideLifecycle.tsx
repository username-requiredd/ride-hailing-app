'use client';

import { useEffect } from 'react';
import { useRideStore } from '@/store/ride';

export function RideLifecycle() {
  const rideStatus = useRideStore((state) => state.rideStatus);
  const setRideStatus = useRideStore((state) => state.setRideStatus);

  useEffect(() => {
    if (rideStatus === 'confirmed') {
      const timer = setTimeout(() => {
        setRideStatus('in-progress');
      }, 5000); // Simulate finding a driver

      return () => clearTimeout(timer);
    }

    if (rideStatus === 'in-progress') {
      const timer = setTimeout(() => {
        setRideStatus('finished');
      }, 10000); // Simulate the trip duration

      return () => clearTimeout(timer);
    }
  }, [rideStatus, setRideStatus]);

  return null;
}
