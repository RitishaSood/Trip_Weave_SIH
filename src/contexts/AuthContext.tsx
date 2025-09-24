import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

// Simple demo user type
interface DemoUser {
  id: string;
  email: string;
}

interface Profile {
  id: string;
  email: string;
  role: 'traveler' | 'official' | null;
  full_name?: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: DemoUser | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: 'traveler' | 'official') => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    // Demo authentication - always succeeds with demo user
    const demoUser: DemoUser = {
      id: 'demo-user-' + Date.now(),
      email: email,
    };

    // Determine role based on email or default to traveler
    const role = email.includes('official') ? 'official' : 'traveler';
    
    const demoProfile: Profile = {
      id: demoUser.id,
      email: email,
      role: role,
      full_name: `Demo ${role === 'official' ? 'Official' : 'Traveler'}`,
    };

    setUser(demoUser);
    setProfile(demoProfile);
    
    toast.success('Successfully signed in!');
  };

  const signUp = async (email: string, password: string, role: 'traveler' | 'official') => {
    // Demo signup - create demo user with specified role
    const demoUser: DemoUser = {
      id: 'demo-user-' + Date.now(),
      email: email,
    };
    
    const demoProfile: Profile = {
      id: demoUser.id,
      email: email,
      role: role,
      full_name: `Demo ${role === 'official' ? 'Official' : 'Traveler'}`,
    };

    setUser(demoUser);
    setProfile(demoProfile);

    toast.success('Account created successfully!');
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    toast.success('Successfully signed out!');
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    // Temporary: Update local profile until database is set up
    setProfile(prev => prev ? { ...prev, ...updates } : null);
    toast.success('Profile updated successfully!');
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}