'use client';

import { useTheme } from '@/app/contexts/ThemeContext';

export function ThemeSwitcher() {
  const { toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="p-2 rounded-md bg-gray-200 hover:bg-gray-300">
      Toggle Theme
    </button>
  );
}
