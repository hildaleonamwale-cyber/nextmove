import React, { createContext, useState, useContext, useEffect } from 'react';
import { Property, User, initialProperties, initialUsers } from '../data/mockData';

interface AppContextType {
  properties: Property[];
  users: User[];
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('nm_properties');
    return saved ? JSON.parse(saved) : initialProperties;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('nm_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nm_currentUser');
    return saved ? JSON.parse(saved) : initialUsers[0];
  });

  useEffect(() => {
    localStorage.setItem('nm_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('nm_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('nm_currentUser', JSON.stringify(currentUser));
      // Also update the user in the users array
      setUsers(prev => prev.map(u => u.id === currentUser.id ? currentUser : u));
    }
  }, [currentUser]);

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    if (currentUser && currentUser.id === id) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  };

  return (
    <AppContext.Provider value={{ properties, users, currentUser, setCurrentUser, updateProperty, updateUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
