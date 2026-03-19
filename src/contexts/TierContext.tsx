import React, { createContext, useContext, useState } from 'react';

export type Tier = 'agency' | 'team' | 'solo' | 'basic' | 'worker';

interface TierContextType {
  tier: Tier;
  setTier: (tier: Tier) => void;
}

const TierContext = createContext<TierContextType | undefined>(undefined);

export const TierProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tier, setTier] = useState<Tier>('agency');

  return (
    <TierContext.Provider value={{ tier, setTier }}>
      {children}
    </TierContext.Provider>
  );
};

export const useTier = () => {
  const context = useContext(TierContext);
  if (!context) {
    throw new Error('useTier must be used within a TierProvider');
  }
  return context;
};
