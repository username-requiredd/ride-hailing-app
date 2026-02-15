'use client';

import { Sidebar } from '@/app/components/Sidebar';
import { Map } from '@/app/components/Map';
import { RideDetails } from '@/app/components/RideDetails';
import { useRideStore } from '@/store/ride';
import { useTheme } from '@/contexts/ThemeContext';

export default function Home() {
  const rideStatus = useRideStore(s => s.rideStatus);
  const { themeStyles } = useTheme();

  return (
    <div className="h-screen w-screen flex" style={{ background: themeStyles.background, color: themeStyles.text }}>
      <Sidebar />
      <div className="flex-1 h-full">
        <Map />
      </div>
      {rideStatus !== 'idle' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <RideDetails />
        </div>
      )}
    </div>
  );
}
