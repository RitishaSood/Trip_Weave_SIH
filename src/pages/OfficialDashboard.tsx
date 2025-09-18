import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, CheckCircle, Search, Filter, Download, Calendar, Car, Plane, Train } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Trip {
  id: string;
  title: string;
  origin: string;
  destination: string;
  start_date: string;
  end_date: string;
  mode_of_transport: string;
  companions_count: number;
  has_data_consent: boolean;
  created_at: string;
}

interface TripStats {
  totalTrips: number;
  tripsWithConsent: number;
  averageCompanions: number;
  totalCompanions: number;
}

export default function OfficialDashboard() {
  const { profile } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [stats, setStats] = useState<TripStats>({
    totalTrips: 0,
    tripsWithConsent: 0,
    averageCompanions: 0,
    totalCompanions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modeFilter, setModeFilter] = useState('all');
  const [consentFilter, setConsentFilter] = useState('all');

  useEffect(() => {
    fetchTrips();
  }, []);

  useEffect(() => {
    filterTrips();
  }, [trips, searchTerm, modeFilter, consentFilter]);

  const fetchTrips = async () => {
    try {
      // Temporary mock data until database is set up
      const mockTrips: Trip[] = [
        {
          id: '1',
          title: 'Weekend Getaway to Paris',
          origin: 'London',
          destination: 'Paris',
          start_date: '2024-02-15',
          end_date: '2024-02-17',
          mode_of_transport: 'train',
          companions_count: 2,
          has_data_consent: true,
          created_at: '2024-02-01T10:00:00Z',
        },
        {
          id: '2',
          title: 'Business Trip to Berlin',
          origin: 'London',
          destination: 'Berlin',
          start_date: '2024-03-01',
          end_date: '2024-03-03',
          mode_of_transport: 'flight',
          companions_count: 1,
          has_data_consent: false,
          created_at: '2024-02-10T14:30:00Z',
        },
        {
          id: '3',
          title: 'Summer Holiday in Barcelona',
          origin: 'Manchester',
          destination: 'Barcelona',
          start_date: '2024-07-10',
          end_date: '2024-07-20',
          mode_of_transport: 'flight',
          companions_count: 4,
          has_data_consent: true,
          created_at: '2024-02-20T09:15:00Z',
        },
        {
          id: '4',
          title: 'Road Trip to Edinburgh',
          origin: 'Birmingham',
          destination: 'Edinburgh',
          start_date: '2024-04-05',
          end_date: '2024-04-08',
          mode_of_transport: 'car',
          companions_count: 3,
          has_data_consent: true,
          created_at: '2024-03-01T16:45:00Z',
        },
        {
          id: '5',
          title: 'Train Journey to Amsterdam',
          origin: 'London',
          destination: 'Amsterdam',
          start_date: '2024-05-12',
          end_date: '2024-05-15',
          mode_of_transport: 'train',
          companions_count: 2,
          has_data_consent: false,
          created_at: '2024-03-15T11:20:00Z',
        },
      ];

      const tripsData = mockTrips;
      setTrips(tripsData);
      
      // Calculate stats
      const totalTrips = tripsData.length;
      const tripsWithConsent = tripsData.filter(t => t.has_data_consent).length;
      const totalCompanions = tripsData.reduce((acc, trip) => acc + trip.companions_count, 0);
      const averageCompanions = totalTrips > 0 ? Math.round((totalCompanions / totalTrips) * 10) / 10 : 0;

      setStats({
        totalTrips,
        tripsWithConsent,
        averageCompanions,
        totalCompanions,
      });
    } catch (error) {
      console.error('Error in fetchTrips:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTrips = () => {
    let filtered = trips;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (trip) =>
          trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trip.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Mode filter
    if (modeFilter !== 'all') {
      filtered = filtered.filter((trip) => trip.mode_of_transport === modeFilter);
    }

    // Consent filter
    if (consentFilter !== 'all') {
      filtered = filtered.filter((trip) => 
        consentFilter === 'with-consent' ? trip.has_data_consent : !trip.has_data_consent
      );
    }

    setFilteredTrips(filtered);
  };

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'car':
        return Car;
      case 'flight':
        return Plane;
      case 'train':
        return Train;
      default:
        return MapPin;
    }
  };

  const exportData = () => {
    const csvContent = [
      'Title,Origin,Destination,Start Date,End Date,Transport Mode,Companions,Has Consent,Created At',
      ...filteredTrips.map(trip => 
        `"${trip.title}","${trip.origin}","${trip.destination}","${trip.start_date}","${trip.end_date}","${trip.mode_of_transport}",${trip.companions_count},${trip.has_data_consent},"${trip.created_at}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trip-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-primary rounded-2xl p-8 text-white shadow-travel">
        <h1 className="text-3xl font-bold mb-2">
          Transportation Data Dashboard
        </h1>
        <p className="text-white/80 text-lg">
          Welcome, {profile?.full_name || 'Official'}. Analyze travel patterns and transportation trends.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-8 h-8 text-primary" />
              <div>
                <p className="text-3xl font-bold text-card-foreground">{stats.totalTrips}</p>
                <p className="text-sm text-muted-foreground">Total Trips</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-8 h-8 text-secondary" />
              <div>
                <p className="text-3xl font-bold text-card-foreground">{stats.tripsWithConsent}</p>
                <p className="text-sm text-muted-foreground">With Data Consent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-accent-foreground" />
              <div>
                <p className="text-3xl font-bold text-card-foreground">{stats.averageCompanions}</p>
                <p className="text-sm text-muted-foreground">Avg. Companions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-8 h-8 text-primary-glow" />
              <div>
                <p className="text-3xl font-bold text-card-foreground">{stats.totalCompanions}</p>
                <p className="text-sm text-muted-foreground">Total Travelers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-card-foreground">Trip Data Analysis</CardTitle>
              <CardDescription>Filter and analyze transportation data</CardDescription>
            </div>
            <Button 
              onClick={exportData}
              className="gap-2"
              variant="outline"
            >
              <Download className="w-4 h-4" />
              Export Data
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search trips by title, origin, or destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={modeFilter} onValueChange={setModeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Transport Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="flight">Flight</SelectItem>
                <SelectItem value="train">Train</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
              </SelectContent>
            </Select>
            <Select value={consentFilter} onValueChange={setConsentFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Data Consent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trips</SelectItem>
                <SelectItem value="with-consent">With Consent</SelectItem>
                <SelectItem value="without-consent">Without Consent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Trip Data Table */}
      <Card className="bg-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">
            Trip Records ({filteredTrips.length} of {trips.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Trip</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Transport</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Companions</TableHead>
                    <TableHead>Data Consent</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrips.length > 0 ? (
                    filteredTrips.map((trip) => {
                      const TransportIcon = getTransportIcon(trip.mode_of_transport);
                      return (
                        <TableRow key={trip.id} className="hover:bg-muted/20">
                          <TableCell className="font-medium">
                            <div>
                              <p className="font-semibold text-card-foreground">{trip.title}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{trip.origin}</span>
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm">{trip.destination}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <TransportIcon className="w-4 h-4 text-muted-foreground" />
                              <span className="capitalize text-sm">{trip.mode_of_transport || 'N/A'}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{new Date(trip.start_date).toLocaleDateString()}</p>
                              <p className="text-muted-foreground">
                                to {new Date(trip.end_date).toLocaleDateString()}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-mono">
                              {trip.companions_count}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={trip.has_data_consent ? "default" : "secondary"}
                              className={trip.has_data_consent ? "bg-green-100 text-green-800" : ""}
                            >
                              {trip.has_data_consent ? 'Yes' : 'No'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(trip.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex flex-col items-center gap-2">
                          <Filter className="w-12 h-12 text-muted-foreground" />
                          <p className="text-muted-foreground">
                            {trips.length === 0 ? 'No trip data available' : 'No trips match your filters'}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}