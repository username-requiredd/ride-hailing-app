'use client';

import { useRideStore } from '@/store/ride';

export function DriverArrived() {
  const { driverInfo } = useRideStore();

  return (
    <div className="absolute bottom-0 left-0 w-full bg-white shadow-lg z-10 p-4">
      <h2 className="text-lg font-semibold">Your driver has arrived!</h2>
      {driverInfo && (
        <div>
          <p className="text-gray-600">{driverInfo.name} in a {driverInfo.car}</p>
          <p className="text-gray-600">License Plate: {driverInfo.license}</p>
        </div>
      )}
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">Confirm Pickup</button>
    </div>
  );
}
