import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppLayout } from "./components/AppLayout";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import TravelerDashboard from "./pages/TravelerDashboard";
import OfficialDashboard from "./pages/OfficialDashboard";
import Dashboard from "./pages/Dashboard";
import TripPlanner from "./pages/TripPlanner";
import Itinerary from "./pages/Itinerary";
import Rides from "./pages/Rides";
import Food from "./pages/Food";
import Safety from "./pages/Safety";
import Profile from "./pages/Profile";
import TripLogger from "./pages/TripLogger";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, show public routes
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // If user is authenticated but has no role, redirect to landing
  if (user && !profile?.role) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Authenticated user with role - show role-based routes
  return (
    <SidebarProvider>
      <AppLayout>
        <Routes>
          {/* Role-based dashboard redirects */}
          <Route 
            path="/" 
            element={
              <Navigate 
                to={profile?.role === 'traveler' ? '/traveler/dashboard' : '/official/dashboard'} 
                replace 
              />
            } 
          />

          {/* Traveler routes */}
          <Route 
            path="/traveler/dashboard" 
            element={
              <ProtectedRoute requiredRole="traveler">
                <TravelerDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Official routes */}
          <Route 
            path="/official/dashboard" 
            element={
              <ProtectedRoute requiredRole="official">
                <OfficialDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Shared traveler features */}
          <Route 
            path="/trip-planner" 
            element={
              <ProtectedRoute requiredRole="traveler">
                <TripPlanner />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/itinerary" 
            element={
              <ProtectedRoute requiredRole="traveler">
                <Itinerary />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rides" 
            element={
              <ProtectedRoute requiredRole="traveler">
                <Rides />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/food" 
            element={
              <ProtectedRoute requiredRole="traveler">
                <Food />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/safety" 
            element={
              <ProtectedRoute requiredRole="traveler">
                <Safety />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/trip-logger" 
            element={
              <ProtectedRoute requiredRole="traveler">
                <TripLogger />
              </ProtectedRoute>
            } 
          />

          {/* Profile accessible to both roles */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
