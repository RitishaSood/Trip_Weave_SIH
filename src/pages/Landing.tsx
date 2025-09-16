import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Users, Shield, BarChart3 } from 'lucide-react';
import heroImage from '@/assets/hero-travel.jpg';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            TripWeave
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Weaving Travel Experiences with Smart Data Collection
          </p>
          <p className="text-lg mb-12 text-white/80 max-w-2xl mx-auto">
            Plan your perfect journey while contributing to transportation research. 
            Choose your role below to get started.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate('/auth?role=traveler')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold min-w-48"
            >
              <MapPin className="mr-2 h-5 w-5" />
              I'm a Traveler
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/auth?role=official')}
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg font-semibold min-w-48"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              I'm an Official
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Two Perspectives, One Platform</h2>
            <p className="text-lg text-muted-foreground">
              Whether you're exploring or researching, TripWeave has you covered
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">For Travelers</CardTitle>
                <CardDescription>
                  Plan, book, and experience your perfect trip
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Smart itinerary planning with real POIs
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Live ride booking and tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Food discovery and reservations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    Safety tools and emergency contacts
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl">For Officials</CardTitle>
                <CardDescription>
                  Access research-grade transportation data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Real-time trip data collection
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Travel pattern analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Export data for research (CSV/BigQuery)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    NATPAC-compliant data standards
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Privacy & Data Security</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your data is secure and used only for legitimate research purposes. 
            Travelers maintain full control over their data sharing preferences, 
            and all data collection follows strict privacy guidelines.
          </p>
          <div className="flex justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Consent-based collection
            </span>
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Encrypted storage
            </span>
            <span className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Research-grade standards
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;