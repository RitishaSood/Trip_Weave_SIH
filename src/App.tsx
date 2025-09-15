import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppLayout } from "./components/AppLayout";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/trip-planner" element={<TripPlanner />} />
              <Route path="/itinerary" element={<Itinerary />} />
              <Route path="/rides" element={<Rides />} />
              <Route path="/food" element={<Food />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/trip-logger" element={<TripLogger />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
