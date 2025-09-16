import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Dashboard from './Dashboard';

const TravelerDashboard = () => {
  const { profile } = useAuth();

  // Reuse the existing Dashboard component for travelers
  return <Dashboard />;
};

export default TravelerDashboard;