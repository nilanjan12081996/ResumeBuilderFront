// context/TabsContext.js
'use client';
import { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

export const TabsProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('edit');

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => useContext(TabsContext);
