import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plane, MapPin, Users, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import heroImage from '@/assets/hero-travel.jpg';

export default function Landing() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  useEffect(() => {
    // Redirect authenticated users based on their role
    if (user && profile?.role) {
      const redirectPath = profile.role === 'traveler' ? '/traveler/dashboard' : '/official/dashboard';
      navigate(redirectPath, { replace: true });
    }
  }, [user, profile, navigate]);

  const handleRoleSelection = (role: 'traveler' | 'official') => {
    navigate('/auth', { state: { role } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      {/* Header */}
      <header className="bg-header/95 backdrop-blur-sm border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-header-foreground">TripWeave</h1>
                <p className="text-sm text-header-foreground/70">Smart Travel Planning & Data Collection</p>
              </div>
            </div>
            {user && (
              <Button 
                variant="outline" 
                onClick={() => navigate('/auth')}
                className="border-white/20 text-header-foreground hover:bg-white/10"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Beautiful travel destination" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Plan Perfect Trips with 
              <span className="text-primary"> Smart Insights</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Whether you're planning your next adventure or analyzing travel patterns, 
              TripWeave provides the tools you need for smarter travel decisions.
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card className="p-8 bg-card/80 backdrop-blur-sm border-border shadow-travel hover:shadow-glow transition-all duration-300 group cursor-pointer">
                <div className="text-center" onClick={() => handleRoleSelection('traveler')}>
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-card group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-4">I'm a Traveler</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Plan itineraries, book rides, discover food, and navigate safely with our comprehensive travel tools.
                  </p>
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-primary hover:opacity-90 shadow-card"
                    onClick={() => handleRoleSelection('traveler')}
                  >
                    Start Planning
                  </Button>
                </div>
              </Card>

              <Card className="p-8 bg-card/80 backdrop-blur-sm border-border shadow-travel hover:shadow-glow transition-all duration-300 group cursor-pointer">
                <div className="text-center" onClick={() => handleRoleSelection('official')}>
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-card group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-4">I'm an Official</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Access transportation data, analyze travel patterns, and make informed policy decisions with data insights.
                  </p>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white shadow-card"
                    onClick={() => handleRoleSelection('official')}
                  >
                    Access Dashboard
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">Powerful Features for Every Journey</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From trip planning to data analysis, discover how TripWeave enhances your travel experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 bg-card border-border shadow-card hover:shadow-travel transition-all duration-300">
              <MapPin className="w-12 h-12 text-primary mb-4" />
              <h4 className="text-xl font-semibold text-card-foreground mb-2">Smart Itineraries</h4>
              <p className="text-muted-foreground">Create personalized travel plans with AI-powered recommendations.</p>
            </Card>

            <Card className="p-6 bg-card border-border shadow-card hover:shadow-travel transition-all duration-300">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h4 className="text-xl font-semibold text-card-foreground mb-2">Data Insights</h4>
              <p className="text-muted-foreground">Analyze travel patterns and transportation trends with comprehensive data.</p>
            </Card>

            <Card className="p-6 bg-card border-border shadow-card hover:shadow-travel transition-all duration-300">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h4 className="text-xl font-semibold text-card-foreground mb-2">Safety First</h4>
              <p className="text-muted-foreground">Travel with confidence using our safety tools and emergency features.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-header border-t border-border py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane className="w-6 h-6 text-header-foreground" />
            <span className="text-xl font-bold text-header-foreground">TripWeave</span>
          </div>
          <p className="text-header-foreground/70">
            Empowering travelers and officials with smart transportation solutions.
          </p>
        </div>
      </footer>
    </div>
  );
}