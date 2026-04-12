import React, { createContext, useState, useContext, useEffect } from 'react';
import { Property, User, initialProperties, initialUsers } from '../data/mockData';
import { supabase } from '../lib/supabase';

interface AppContextType {
  properties: Property[];
  users: User[];
  requests: any[];
  wallet: any;
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  supabaseUser: any; // Add supabase user type
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [supabaseUser, setSupabaseUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [wallet, setWallet] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Supabase Auth Listener & Data Fetching
  useEffect(() => {
    const fetchInitialData = async (sessionUser: any) => {
      setIsLoading(true);
      try {
        // Fetch properties
        const { data: propertiesData, error: propertiesError } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (!propertiesError && propertiesData) {
          setProperties(propertiesData as any[]);
        }

        // Fetch users (for admin/agency views)
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('*');
          
        if (!usersError && usersData) {
          setUsers(usersData as any[]);
        }

        // Fetch viewing requests
        const { data: requestsData, error: requestsError } = await supabase
          .from('viewing_requests')
          .select('*, properties(*)');
          
        if (!requestsError && requestsData) {
          setRequests(requestsData as any[]);
        }

        // If logged in, fetch current user profile
        if (sessionUser) {
          const { data: profileData, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', sessionUser.id)
            .single();
            
          if (!profileError && profileData) {
            setCurrentUser(profileData as any);
          }

          const { data: walletData, error: walletError } = await supabase
            .from('wallet')
            .select('*')
            .eq('user_id', sessionUser.id)
            .single();
            
          if (!walletError && walletData) {
            setWallet(walletData);
          }
        } else {
          setCurrentUser(null);
          setWallet(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user ?? null;
      setSupabaseUser(user);
      fetchInitialData(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      setSupabaseUser(user);
      fetchInitialData(user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    // Optimistic update
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    
    // Backend update
    await supabase.from('properties').update(updates).eq('id', id);
  };

  const updateUser = async (id: string, updates: Partial<User>) => {
    // Optimistic update
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    if (currentUser && currentUser.id === id) {
      setCurrentUser({ ...currentUser, ...updates } as any);
    }
    
    // Backend update
    await supabase.from('users').update(updates).eq('id', id);
  };

  return (
    <AppContext.Provider value={{ properties, users, requests, wallet, currentUser, setCurrentUser, updateProperty, updateUser, supabaseUser, isLoading }}>
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
