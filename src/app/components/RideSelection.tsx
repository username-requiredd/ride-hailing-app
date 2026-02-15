'use client';

import { useRideStore } from '@/store/ride';
import { PlaceAutocomplete } from './PlaceAutocomplete';
import { shallow } from 'zustand/shallow';

export function RideSelection() {
  const { pickupLocation, dropoffLocation, setRideStage, setRideType } = useRideStore(
    (state) => ({
      pickupLocation: state.pickupLocation,
      dropoffLocation: state.dropoffLocation,
      setRideStage: state.setRideStage,
      setRideType: state.setRideType,
    }),
    shallow
  );

  const handleRideRequest = (rideType: 'economy' | 'business') => {
    setRideType(rideType);
    setRideStage('findingDriver');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg rounded-t-lg">
      <h2 className="text-xl font-bold mb-4">Where to?</h2>
      <div className="grid grid-cols-1 gap-4">
        <PlaceAutocomplete
          onLocationSelect={(loc) => useRideStore.getState().setPickupLocation(loc)}
          placeholder="Enter pickup location"
          defaultValue={pickupLocation?.address}
        />
        <PlaceAutocomplete
          onLocationSelect={(loc) => useRideStore.getState().setDropoffLocation(loc)}
          placeholder="Enter dropoff location"
          defaultValue={dropoffLocation?.address}
        />
      </div>
      {pickupLocation && dropoffLocation && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <button 
            onClick={() => handleRideRequest('economy')} 
            className="bg-black text-white p-4 rounded-lg font-bold"
          >
            Economy - $10
          </button>
          <button 
            onClick={() => handleRideRequest('business')} 
            className="bg-gray-800 text-white p-4 rounded-lg font-bold"
          >
            Business - $20
          </button>
        </div>
      )}
    </div>
  );
}
