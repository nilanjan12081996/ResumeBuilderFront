'use client';
import React, { createContext, useContext, useState } from 'react';

const ThemeColorContext = createContext();

export const ThemeColorProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState('#2163CA');

  return (
    <ThemeColorContext.Provider value={{ themeColor, setThemeColor }}>
      <div style={{ '--theme-color': themeColor }}>
        {children}
      </div>
    </ThemeColorContext.Provider>
  );
};

export const useThemeColor = () => useContext(ThemeColorContext);
