import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Url } from '../components/UiBuilder';

interface LinksContextType {
  links: Url[];
  setLinks: React.Dispatch<React.SetStateAction<Url[]>>;
}
interface LinksProviderProps {
  children: ReactNode;
}
const LinksContext = createContext<LinksContextType | undefined>(undefined);

export const useLinks = (): LinksContextType => {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error('useLinks must be used within a LinksProvider');
  }
  return context;
};

export const LinksProvider: React.FC<LinksProviderProps> = ({ children }) => {
  const [links, setLinks] = useState<Url[]>([]);

  return (
    <LinksContext.Provider value={{ links, setLinks }}>
      {children}
    </LinksContext.Provider>
  );
};
