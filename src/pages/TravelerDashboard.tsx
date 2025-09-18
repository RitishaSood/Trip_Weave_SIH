import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Route, Car, Utensils, Shield, Plus, Calendar, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface Trip {
  id: string;
  title: string;
  description: string;
  origin: string;
  destination: string;
  start_date: string;
  end_date: string;
  mode_of_transport: string;
  companions_count: number;
  has_data_consent: boolean;
}

export default function TravelerDashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      // Temporary mock data until database is set up
      const mockTrips: Trip[] = [
        {
          id: '1',
          title: 'Weekend Getaway to Paris',
          description: 'A romantic weekend in the city of lights',
          origin: 'London',
          destination: 'Paris',
          start_date: '2024-02-15',
          end_date: '2024-02-17',
          mode_of_transport: 'train',
          companions_count: 2,
          has_data_consent: true,
        },
        {
          id: '2',
          title: 'Business Trip to Berlin',
          description: 'Tech conference in Berlin',
          origin: 'London',
          destination: 'Berlin',
          start_date: '2024-03-01',
          end_date: '2024-03-03',
          mode_of_transport: 'flight',
          companions_count: 1,
          has_data_consent: false,
        },
      ];

      setTrips(mockTrips);
    } catch (error) {
      console.error('Error in fetchTrips:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Plan New Trip',
      description: 'Create a detailed itinerary',
      icon: MapPin,
      path: '/trip-planner',
      color: 'bg-primary',
    },
    {
      title: 'View Itineraries',
      description: 'Manage your travel plans',
      icon: Route,
      path: '/itinerary',
      color: 'bg-secondary',
    },
    {
      title: 'Book Rides',
      description: 'Find transportation options',
      icon: Car,
      path: '/rides',
      color: 'bg-accent',
    },
    {
      title: 'Discover Food',
      description: 'Explore local cuisine',
      icon: Utensils,
      path: '/food',
      color: 'bg-primary-glow',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-primary rounded-2xl p-8 text-white shadow-travel">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {profile?.full_name || 'Traveler'}!
        </h1>
        <p className="text-white/80 text-lg">
          Ready for your next adventure? Let's start planning your perfect trip.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold text-card-foreground">{trips.length}</p>
                <p className="text-sm text-muted-foreground">Total Trips</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold text-card-foreground">
                  {trips.filter(t => new Date(t.start_date) > new Date()).length}
                </p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-accent-foreground" />
              <div>
                <p className="text-2xl font-bold text-card-foreground">
                  {trips.reduce((acc, trip) => acc + trip.companions_count, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Companions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-primary-glow" />
              <div>
                <p className="text-2xl font-bold text-card-foreground">
                  {trips.filter(t => t.has_data_consent).length}
                </p>
                <p className="text-sm text-muted-foreground">With Consent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
          <CardDescription>Get started with these popular features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto p-6 flex flex-col items-center space-y-2 hover:shadow-card transition-all duration-200"
                onClick={() => navigate(action.path)}
              >
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-sm">{action.title}</h3>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Trips */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-card-foreground">Recent Trips</CardTitle>
            <CardDescription>Your latest travel adventures</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => navigate('/trip-planner')}
          >
            <Plus className="w-4 h-4" />
            New Trip
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : trips.length > 0 ? (
            <div className="space-y-4">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => navigate('/itinerary')}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">{trip.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {trip.origin} → {trip.destination}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-card-foreground">
                      {new Date(trip.start_date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {trip.companions_count} companion{trip.companions_count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">No trips yet</h3>
              <p className="text-muted-foreground mb-4">
                Start planning your first adventure with TripWeave
              </p>
              <Button
                onClick={() => navigate('/trip-planner')}
                className="bg-gradient-primary hover:opacity-90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Plan Your First Trip
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}