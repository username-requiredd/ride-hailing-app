'use client';

import { RideController } from '@/app/components/RideController';
import { MapView } from '@/app/components/MapView';
import { UserLocationTracker } from '@/app/components/UserLocationTracker';
import { MapCameraManager } from '@/app/components/MapCameraManager';
import { SimulationController } from '@/app/components/SimulationController';
import { RideLifecycle } from '@/app/components/RideLifecycle';
import { useRideStore } from '@/store/ride';
import SignIn from './components/SignIn';
import { shallow } from 'zustand/shallow';

export default function Home() {
  const {
    pickupLocation,
    dropoffLocation,
    rideStatus,
  } = useRideStore(
    (state) => ({
      pickupLocation: state.pickupLocation,
      dropoffLocation: state.dropoffLocation,
      rideStatus: state.rideStatus,
    }),
    shallow
  );

  const isRouteVisible = !!pickupLocation && !!dropoffLocation;

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <SignIn />
      <MapView />
      <UserLocationTracker />
      <MapCameraManager />
      
      {/* Ride Lifecycle & Simulation */}
      <RideController />
      <RideLifecycle />
      {rideStatus === 'in-progress' && isRouteVisible && (
        <SimulationController />
      )}
    </main>
  );
}
