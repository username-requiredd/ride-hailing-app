'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRideStore } from '@/store/ride';
import { LocationAutocompleteInput } from './LocationAutocompleteInput';

export function RideController() {
  const {
    setPickupLocation,
    setDropoffLocation,
    pickupLocation,
    dropoffLocation,
    setIsPickupWithinMaiduguri,
    setIsDropoffWithinMaiduguri,
    isPickupWithinMaiduguri,
    isDropoffWithinMaiduguri,
    setRideStatus,
    rideStatus,
    isGoogleMapsLoaded,
  } = useRideStore();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const maiduguriPolygon = useRef<google.maps.Polygon | null>(null);

  useEffect(() => {
    if (isGoogleMapsLoaded) {
      maiduguriPolygon.current = new google.maps.Polygon({
        paths: [
          { lat: 11.87, lng: 13.05 },
          { lat: 11.9, lng: 13.1 },
          { lat: 11.8, lng: 13.25 },
          { lat: 11.75, lng: 13.2 },
        ],
      });
    }
  }, [isGoogleMapsLoaded]);

  const handlePickupSelect = (location: google.maps.LatLngLiteral, address: string) => {
    if (maiduguriPolygon.current) {
      const isWithin = google.maps.geometry.poly.containsLocation(location, maiduguriPolygon.current);
      setIsPickupWithinMaiduguri(isWithin);
      if (isWithin) {
        setPickupLocation({ ...location, address });
      } else {
        alert('Pickup location must be within Maiduguri.');
      }
    }
  };

  const handleDropoffSelect = (location: google.maps.LatLngLiteral, address: string) => {
    if (maiduguriPolygon.current) {
      const isWithin = google.maps.geometry.poly.containsLocation(location, maiduguriPolygon.current);
      setIsDropoffWithinMaiduguri(isWithin);
      if (isWithin) {
        setDropoffLocation({ ...location, address });
      } else {
        alert('Dropoff location must be within Maiduguri.');
      }
    }
  };

  const handleStartRide = () => {
    if (pickupLocation && dropoffLocation && isPickupWithinMaiduguri && isDropoffWithinMaiduguri) {
      setRideStatus('confirmed');
      setIsModalOpen(false);
    } else {
      alert('Please select valid pickup and dropoff locations within Maiduguri.');
    }
  };

  if (!isModalOpen || !isGoogleMapsLoaded) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-4">Set your ride</h2>
        <div className="space-y-4">
          <LocationAutocompleteInput onLocationSelect={handlePickupSelect} type="pickup" />
          {isPickupWithinMaiduguri === false && <p className="text-red-500">Pickup location must be within Maiduguri.</p>}
          <LocationAutocompleteInput onLocationSelect={handleDropoffSelect} type="dropoff" />
          {isDropoffWithinMaiduguri === false && <p className="text-red-500">Dropoff location must be within Maiduguri.</p>}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">Cancel</button>
          <button onClick={handleStartRide} className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400" disabled={!pickupLocation || !dropoffLocation || !isPickupWithinMaiduguri || !isDropoffWithinMaiduguri}>
            Start Ride
          </button>
        </div>
      </div>
    </div>
  );
}
