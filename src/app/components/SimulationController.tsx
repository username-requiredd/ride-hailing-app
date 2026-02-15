'use client';

import React from 'react';
import { useRideStore } from '@/store/ride';

export function SimulationController() {
  const {
    isSimulating,
    setIsSimulating,
    simulationSpeed,
    setSimulationSpeed,
    setAnimationProgress,
    pickupLocation,
    setDriverLocation,
    isFollowingDriver,
    setIsFollowingDriver,
  } = useRideStore();

  const handleStart = () => setIsSimulating(true);
  const handlePause = () => setIsSimulating(false);
  const handleReset = () => {
    setIsSimulating(false);
    setAnimationProgress(0);
    if (pickupLocation) {
      setDriverLocation(pickupLocation);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 p-4 rounded-lg shadow-lg text-white w-64 z-50">
      <h3 className="text-lg font-bold mb-2">Simulation Controls</h3>
      <div className="flex space-x-2 mb-4">
        <button onClick={handleStart} disabled={isSimulating} className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded disabled:opacity-50">Start</button>
        <button onClick={handlePause} disabled={!isSimulating} className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 rounded disabled:opacity-50">Pause</button>
        <button onClick={handleReset} className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded">Reset</button>
      </div>
      <div className="mb-4">
        <label htmlFor="speed-slider" className="block mb-1">Speed: {simulationSpeed} km/h</label>
        <input
          id="speed-slider"
          type="range"
          min="10"
          max="120"
          value={simulationSpeed}
          onChange={(e) => setSimulationSpeed(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="flex items-center">
        <input
          id="follow-driver-checkbox"
          type="checkbox"
          checked={isFollowingDriver}
          onChange={(e) => setIsFollowingDriver(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="follow-driver-checkbox">Follow Driver</label>
      </div>
    </div>
  );
}
