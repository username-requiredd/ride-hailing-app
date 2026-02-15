'use client';

import { useRideStore } from '@/store/ride';
import { Sidebar } from './Sidebar';
import { FindingDriver } from './FindingDriver';
import { TripInProgress } from './TripInProgress';
import { TripComplete } from './TripComplete';
import { RatingModal } from './RatingModal';
import { LocationSelector } from './LocationSelector';
import { DriverInfo } from './DriverInfo';

export function RideController() {
  const rideStatus = useRideStore((state) => state.rideStatus);

  switch (rideStatus) {
    case 'idle':
      return <Sidebar />;
    case 'configuring':
      return <LocationSelector />;
    case 'confirmed':
      return (
        <>
          <FindingDriver />
          <DriverInfo />
        </>
      );
    case 'in-progress':
      return (
        <>
          <TripInProgress />
          <DriverInfo />
        </>
      );
    case 'finished':
      return (
        <>
          <TripComplete />
          <RatingModal />
        </>
      );
    default:
      return <Sidebar />;
  }
}
