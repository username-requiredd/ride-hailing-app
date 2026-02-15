'use client';

import { useRideStore } from '@/store/ride';

export function FindingDriver() {
  const pickupLocation = useRideStore((state) => state.pickupLocation);

  return (
    <div className="absolute bottom-0 left-0 w-full bg-white shadow-lg z-10 p-4">
      <h2 className="text-lg font-semibold">Finding your driver...</h2>
      {pickupLocation && (
        <p className="text-gray-600">Pickup at: {pickupLocation.lat.toFixed(4)}, {pickupLocation.lng.toFixed(4)}</p>
      )}
      <div className="animate-pulse mt-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
}
