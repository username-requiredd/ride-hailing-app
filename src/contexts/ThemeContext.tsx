'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeStyles = useMemo(() => ({
    background: theme === 'light' ? '#ffffff' : '#1a202c',
    text: theme === 'light' ? '#1a202c' : '#ffffff',
    secondary: theme === 'light' ? '#f7fafc' : '#2d3748',
  }), [theme]);

  const value = { theme, toggleTheme, themeStyles };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
