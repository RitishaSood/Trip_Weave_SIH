import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppLayout } from "./components/AppLayout";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import TravelerDashboard from "./pages/TravelerDashboard";
import OfficialDashboard from "./pages/OfficialDashboard";
import TripPlanner from "./pages/TripPlanner";
import Itinerary from "./pages/Itinerary";
import Rides from "./pages/Rides";
import Food from "./pages/Food";
import Safety from "./pages/Safety";
import Profile from "./pages/Profile";
import TripLogger from "./pages/TripLogger";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Traveler Routes */}
            <Route path="/traveler" element={
              <ProtectedRoute requiredRole="traveler">
                <SidebarProvider>
                  <AppLayout>
                    <TravelerDashboard />
                  </AppLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            <Route path="/trip-planner" element={
              <ProtectedRoute requiredRole="traveler">
                <SidebarProvider>
                  <AppLayout>
                    <TripPlanner />
                  </AppLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            <Route path="/itinerary" element={
              <ProtectedRoute requiredRole="traveler">
                <SidebarProvider>
                  <AppLayout>
                    <Itinerary />
                  </AppLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            <Route path="/rides" element={
              <ProtectedRoute requiredRole="traveler">
                <SidebarProvider>
                  <AppLayout>
                    <Rides />
                  </AppLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            <Route path="/food" element={
              <ProtectedRoute requiredRole="traveler">
                <SidebarProvider>
                  <AppLayout>
                    <Food />
                  </AppLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            <Route path="/safety" element={
              <ProtectedRoute requiredRole="traveler">
                <SidebarProvider>
                  <AppLayout>
                    <Safety />
                  </AppLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute requiredRole="traveler">
                <SidebarProvider>
                  <AppLayout>
                    <Profile />
                  </AppLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            <Route path="/trip-logger" element={
              <ProtectedRoute requiredRole="traveler">
                <SidebarProvider>
                  <AppLayout>
                    <TripLogger />
                  </AppLayout>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            
            {/* Protected Official Route */}
            <Route path="/official" element={
              <ProtectedRoute requiredRole="official">
                <OfficialDashboard />
              </ProtectedRoute>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
