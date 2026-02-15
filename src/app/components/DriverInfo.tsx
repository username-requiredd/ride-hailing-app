'use client';

import { useRideStore } from '@/store/ride';

export function DriverInfo() {
  const driver = useRideStore((state) => state.driver);

  if (!driver) return null;

  return (
    <div className="absolute bottom-0 left-0 w-full bg-white shadow-lg z-10 p-4">
      <h2 className="text-lg font-semibold">Your Driver is on the way</h2>
      <div className="flex items-center space-x-4 mt-4">
        <img src={driver.photoUrl} alt={driver.name} className="w-16 h-16 rounded-full" />
        <div>
          <p className="font-semibold">{driver.name}</p>
          <p className="text-gray-600">{driver.vehicle.make} {driver.vehicle.model} - {driver.vehicle.licensePlate}</p>
          <p className="text-yellow-500">{driver.rating} ★</p>
        </div>
      </div>
    </div>
  );
}
