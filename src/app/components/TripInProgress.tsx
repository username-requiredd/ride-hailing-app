'use client';

import { useRideStore } from '@/store/ride';

export function TripInProgress() {
  const rideType = useRideStore((state) => state.rideType);

  return (
    <div className="absolute bottom-0 left-0 w-full bg-white shadow-lg z-10 p-4">
      <h2 className="text-lg font-semibold">Trip in Progress</h2>
      <p className="text-gray-600">Ride Type: {rideType}</p>
      <button className="mt-4 w-full bg-gray-200 text-black py-2 rounded-md">Share Ride Status</button>
    </div>
  );
}
