'use client';

import { useRideStore } from '@/store/ride';

export function LocationSelector() {
  const isConfiguring = useRideStore((state) => state.isConfiguring);
  const setIsConfiguring = useRideStore((state) => state.setIsConfiguring);
  const pickupLocation = useRideStore((state) => state.pickupLocation);
  const dropoffLocation = useRideStore((state) => state.dropoffLocation);
  const setRideStatus = useRideStore((state) => state.setRideStatus);

  const handleConfirm = () => {
    setRideStatus('confirmed');
  };

  return (
    <div className="absolute top-0 left-0 h-full w-96 bg-white shadow-lg z-10 p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-4">Where to?</h1>
        <div className="flex flex-col space-y-4">
          <button
            className={`p-4 rounded-md text-left ${isConfiguring === 'pickup' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setIsConfiguring('pickup')}
          >
            <h2 className="text-lg font-semibold">Pickup Location</h2>
            <p>{pickupLocation ? `${pickupLocation.lat.toFixed(4)}, ${pickupLocation.lng.toFixed(4)}` : 'Select on map'}</p>
          </button>
          <button
            className={`p-4 rounded-md text-left ${isConfiguring === 'dropoff' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setIsConfiguring('dropoff')}
          >
            <h2 className="text-lg font-semibold">Dropoff Location</h2>
            <p>{dropoffLocation ? `${dropoffLocation.lat.toFixed(4)}, ${dropoffLocation.lng.toFixed(4)}` : 'Select on map'}</p>
          </button>
        </div>
      </div>
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-md disabled:bg-gray-400"
        disabled={!pickupLocation || !dropoffLocation}
        onClick={handleConfirm}
      >
        Confirm Ride
      </button>
    </div>
  );
}
