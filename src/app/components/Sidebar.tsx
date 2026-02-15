'use client';

import { useRideStore } from '@/store/ride';

export function Sidebar() {
  const { rideType, setRideType, setRideStatus } = useRideStore();

  const handleRideSelection = (type: 'economy' | 'business') => {
    setRideType(type);
    setRideStatus('confirmed');
  };

  return (
    <div className="absolute top-0 left-0 h-full w-96 bg-white shadow-lg z-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Select a Ride</h1>
      <div className="flex flex-col space-y-4">
        <button
          className={`p-4 rounded-md text-left ${rideType === 'economy' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleRideSelection('economy')}
        >
          <h2 className="text-lg font-semibold">Economy</h2>
          <p>Affordable, everyday rides</p>
        </button>
        <button
          className={`p-4 rounded-md text-left ${rideType === 'business' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleRideSelection('business')}
        >
          <h2 className="text-lg font-semibold">Business</h2>
          <p>Premium rides with professional drivers</p>
        </button>
      </div>
    </div>
  );
}
