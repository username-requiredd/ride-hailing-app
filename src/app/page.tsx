'use client';

import { MapView } from "@/app/components/MapView";
import { RideController } from "@/app/components/RideController";
import { UserLocationTracker } from "@/app/components/UserLocationTracker";
import { DriverSimulator } from "@/app/components/DriverSimulator";
import { SimulationController } from "@/app/components/SimulationController";
import { MapRecenter } from "@/app/components/MapRecenter";
import { useRideStore } from "@/store/ride";

export default function Home() {
  const { geolocationError, rideStatus } = useRideStore();

  return (
    <main>
      <UserLocationTracker />
      {geolocationError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white p-4 rounded-md shadow-lg z-50">
          {geolocationError}
        </div>
      )}
      <MapView />
      <RideController />
      <MapRecenter />
      {rideStatus === 'confirmed' && 
        <>
          <DriverSimulator />
          <SimulationController />
        </>
      }
    </main>
  );
}
