import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plane, MapPin, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp } = useAuth();
  
  const selectedRole = (location.state as any)?.role || 'traveler';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeTab === 'signin') {
        await signIn(email, password);
        // Navigate based on email - if contains 'official', go to official dashboard
        const role = email.includes('official') ? 'official' : 'traveler';
        navigate(role === 'official' ? '/official/dashboard' : '/traveler/dashboard');
      } else {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await signUp(email, password, selectedRole);
        // Navigate based on selected role
        navigate(selectedRole === 'official' ? '/official/dashboard' : '/traveler/dashboard');
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const roleConfig = {
    traveler: {
      icon: MapPin,
      title: 'Traveler Account',
      description: 'Plan trips, book rides, and explore destinations'
    },
    official: {
      icon: Shield,
      title: 'Official Account',
      description: 'Access transportation data and analytics'
    }
  };

  const config = roleConfig[selectedRole as keyof typeof roleConfig];
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-4 text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">TripWeave</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <IconComponent className="w-5 h-5" />
            <span className="font-medium">{config.title}</span>
          </div>
          <p className="text-sm text-muted-foreground">{config.description}</p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border shadow-travel">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-card-foreground">Welcome</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <TabsContent value="signin" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>
                </TabsContent>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:opacity-90 shadow-card"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    activeTab === 'signin' ? 'Sign In' : 'Create Account'
                  )}
                </Button>
              </form>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}