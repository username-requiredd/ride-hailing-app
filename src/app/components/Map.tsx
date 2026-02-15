'use client';

import { useTheme } from '../contexts/ThemeContext';

export function Map() {
  const { themeStyles } = useTheme();

  return (
    <div 
      className="h-full w-full bg-gray-200"
      style={{ background: themeStyles.secondary }}
    >
      {/* In a real application, a map library like Google Maps or Leaflet would be used here. */}
      <div className="w-full h-full flex items-center justify-center">
        <p style={{ color: themeStyles.text }}>Map Placeholder</p>
      </div>
    </div>
  );
}
