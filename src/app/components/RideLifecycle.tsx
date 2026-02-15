'use client';

import { useEffect } from 'react';
import { useRideStore } from '@/store/ride';
import { shallow } from 'zustand/shallow';

export function RideLifecycle() {
  const { rideStatus, setRideStatus } = useRideStore(
    (state) => ({
      rideStatus: state.rideStatus,
      setRideStatus: state.setRideStatus,
    }),
    shallow
  );

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
