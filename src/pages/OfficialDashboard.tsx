import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, MapPin, Download, TrendingUp, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const OfficialDashboard = () => {
  const { profile, signOut } = useAuth();
  const [stats, setStats] = useState({
    totalTrips: 0,
    activeUsers: 0,
    avgTripDuration: 0,
    topModes: [] as Array<{ mode: string; count: number }>
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch trip statistics
      const { data: trips } = await supabase
        .from('trips')
        .select('*');

      const { data: profiles } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'traveler');

      if (trips) {
        // Calculate mode distribution
        const modeCount = trips.reduce((acc: any, trip) => {
          if (trip.mode) {
            acc[trip.mode] = (acc[trip.mode] || 0) + 1;
          }
          return acc;
        }, {});

        const topModes = Object.entries(modeCount)
          .map(([mode, count]) => ({ mode, count: count as number }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        // Calculate average trip duration
        const completedTrips = trips.filter(trip => trip.start_time && trip.end_time);
        const avgDuration = completedTrips.length > 0 
          ? completedTrips.reduce((acc, trip) => {
              const duration = new Date(trip.end_time).getTime() - new Date(trip.start_time).getTime();
              return acc + duration;
            }, 0) / completedTrips.length / 1000 / 60 // Convert to minutes
          : 0;

        setStats({
          totalTrips: trips.length,
          activeUsers: profiles?.length || 0,
          avgTripDuration: Math.round(avgDuration),
          topModes
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const exportData = async () => {
    try {
      const { data: trips } = await supabase
        .from('trips')
        .select(`
          *,
          trip_points (*)
        `);

      if (trips) {
        const csv = convertToCSV(trips);
        downloadCSV(csv, 'tripweave_data.csv');
      }
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const convertToCSV = (data: any[]) => {
    const headers = ['trip_id', 'user_id', 'start_time', 'end_time', 'mode', 'origin', 'destination', 'trip_number', 'companions'];
    const rows = data.map(trip => [
      trip.id,
      trip.user_id,
      trip.start_time,
      trip.end_time,
      trip.mode || '',
      trip.origin || '',
      trip.destination || '',
      trip.trip_number || '',
      JSON.stringify(trip.companions || [])
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Transportation Research Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {profile?.full_name} • NATPAC Official
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={signOut}
          className="ml-4"
        >
          Sign Out
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTrips}</div>
            <p className="text-xs text-muted-foreground">
              Collected from all users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Travelers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered traveler accounts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Trip Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgTripDuration}min</div>
            <p className="text-xs text-muted-foreground">
              Based on completed trips
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Points</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTrips * 15}</div>
            <p className="text-xs text-muted-foreground">
              Estimated location points
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Travel Modes Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Travel Modes</CardTitle>
            <CardDescription>Distribution of transportation methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topModes.map((mode, index) => (
                <div key={mode.mode} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {mode.mode}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium">
                    {mode.count} trips
                  </div>
                </div>
              ))}
              {stats.topModes.length === 0 && (
                <p className="text-muted-foreground text-sm">No data available yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Data Export */}
        <Card>
          <CardHeader>
            <CardTitle>Data Export</CardTitle>
            <CardDescription>Download research data for analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <BarChart3 className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium">Export Trip Data</p>
                <p className="text-sm text-muted-foreground">
                  Download all trip data in CSV format for BigQuery analysis
                </p>
              </div>
            </div>
            
            <Button onClick={exportData} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download CSV Report
            </Button>
            
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">Data Includes:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Trip origins and destinations</li>
                <li>• Transportation modes and timings</li>
                <li>• GPS coordinates and route data</li>
                <li>• Companion information (anonymized)</li>
                <li>• User consent preferences</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OfficialDashboard;