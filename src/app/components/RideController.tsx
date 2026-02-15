'use client';

import { useRideStore } from '@/store/ride';
import { Sidebar } from './Sidebar';
import { FindingDriver } from './FindingDriver';
import { TripInProgress } from './TripInProgress';
import { TripComplete } from './TripComplete';
import { RatingModal } from './RatingModal';

export function RideController() {
  const { rideStatus } = useRideStore();

  switch (rideStatus) {
    case 'idle':
      return <Sidebar />;
    case 'configuring': // A new state for when the user is setting pickup/dropoff
      return <Sidebar />;
    case 'confirmed':
      return <FindingDriver />;
    case 'in-progress': // This will be used for the actual trip
      return <TripInProgress />;
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
