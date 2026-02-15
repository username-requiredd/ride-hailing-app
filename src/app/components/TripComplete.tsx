'use client';

import { useRideStore } from '@/store/ride';

export function TripComplete() {
  const tripSummary = useRideStore((state) => state.tripSummary);

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Trip Complete!</h2>
        {tripSummary && (
          <div className="space-y-2">
            <p>Fare: ${tripSummary.fare.toFixed(2)}</p>
            <p>Distance: {tripSummary.distance.toFixed(2)} miles</p>
            <p>Duration: {tripSummary.duration.toFixed(2)} minutes</p>
          </div>
        )}
      </div>
    </div>
  );
}
