import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
}

interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  company_name: string;
  avatar_url: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, role: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
          });

          // Get profile
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profileError) throw profileError;
          setProfile(profileData);
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
        });

        (async () => {
          try {
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();

            if (profileError) throw profileError;
            setProfile(profileData);
          } catch (error) {
            console.error('Profile fetch error:', error);
          }
        })();
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string, role: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          }
        }
      });

      if (error) throw error;
      if (!data.user) throw new Error('No user returned from signup');

      const userId = data.user.id;
      setUser({
        id: userId,
        email: data.user.email || '',
      });

      // Create profile with proper error handling
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            email,
            full_name: fullName,
            role,
            is_active: true,
          },
        ])
        .select()
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Create wallet
      const { error: walletError } = await supabase
        .from('wallet')
        .insert([
          {
            user_id: userId,
            balance: role === 'basic' ? 0 : role === 'premium' ? 100 : role === 'admin' ? 500 : 0,
          },
        ]);

      if (walletError) {
        console.error('Wallet creation error:', walletError);
        throw walletError;
      }

      // Create subscription
      const { error: subError } = await supabase
        .from('subscriptions')
        .insert([
          {
            user_id: userId,
            plan: role,
            status: 'active',
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ]);

      if (subError) {
        console.error('Subscription creation error:', subError);
        throw subError;
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || '',
        });

        // Get profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();

        if (profileError) throw profileError;
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
