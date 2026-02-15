'use client';

import { useRideStore } from '@/store/ride';
import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useTheme } from '@/app/contexts/ThemeContext';

export function Sidebar() {
  const rideType = useRideStore((state) => state.rideType);
  const setRideType = useRideStore((state) => state.setRideType);
  const setRideStatus = useRideStore((state) => state.setRideStatus);
  const setIsConfiguring = useRideStore((state) => state.setIsConfiguring);
  const { themeStyles } = useTheme();

  const handleRideSelection = (type: 'economy' | 'business') => {
    setRideType(type);
    setRideStatus('configuring');
    setIsConfiguring('pickup');
  };

  return (
    <div 
      className="absolute top-0 left-0 h-full w-96 shadow-lg z-10 p-4 flex flex-col justify-between"
      style={{ background: themeStyles.background, color: themeStyles.text }}
    >
      <div>
        <h1 className="text-2xl font-bold mb-4">Select a Ride</h1>
        <div className="flex flex-col space-y-4">
          <button
            className={`p-4 rounded-md text-left ${rideType === 'economy' ? 'bg-blue-500 text-white' : ''}`}
            style={{ background: rideType !== 'economy' ? themeStyles.secondary : '' }}
            onClick={() => handleRideSelection('economy')}
          >
            <h2 className="text-lg font-semibold">Economy</h2>
            <p>Affordable, everyday rides</p>
          </button>
          <button
            className={`p-4 rounded-md text-left ${rideType === 'business' ? 'bg-blue-500 text-white' : ''}`}
            style={{ background: rideType !== 'business' ? themeStyles.secondary : '' }}
            onClick={() => handleRideSelection('business')}
          >
            <h2 className="text-lg font-semibold">Business</h2>
            <p>Premium rides with professional drivers</p>
          </button>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <Link href="/history">
           <span className="block w-full text-center p-2 rounded-md hover:bg-gray-300" style={{ background: themeStyles.secondary }}>Ride History</span>
        </Link>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
