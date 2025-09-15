import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Car, Utensils, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const recentTrips = [
    {
      destination: "Goa Beach Resort",
      date: "Dec 15-20, 2024",
      status: "Upcoming",
      image: "🏖️"
    },
    {
      destination: "Kerala Backwaters",
      date: "Nov 8-12, 2024",
      status: "Completed",
      image: "🚢"
    }
  ];

  const quickStats = [
    { label: "Trips Planned", value: "12", icon: MapPin, color: "text-primary" },
    { label: "Days Traveled", value: "45", icon: Calendar, color: "text-secondary" },
    { label: "Rides Booked", value: "28", icon: Car, color: "text-accent" },
    { label: "Restaurants", value: "34", icon: Utensils, color: "text-header" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-hero rounded-xl p-6 text-white"
      >
        <h1 className="text-2xl font-bold mb-2">Welcome back, Traveler!</h1>
        <p className="text-white/90 mb-4">Ready for your next adventure? Let's plan something amazing.</p>
        <Link to="/trip-planner">
          <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
            <Plus className="w-4 h-4 mr-2" />
            Plan New Trip
          </Button>
        </Link>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-surface/50 border-surface hover:shadow-card transition-all duration-300">
              <CardContent className="p-4 text-center">
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Trips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Recent Trips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTrips.map((trip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors cursor-pointer"
              >
                <div className="text-2xl">{trip.image}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{trip.destination}</h3>
                  <p className="text-sm text-muted-foreground">{trip.date}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  trip.status === 'Upcoming' 
                    ? 'bg-primary/20 text-primary' 
                    : 'bg-surface text-surface-foreground'
                }`}>
                  {trip.status}
                </span>
              </motion.div>
            ))}
            <Link to="/profile">
              <Button variant="ghost" className="w-full justify-between">
                View All Trips
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/trip-planner">
              <Button className="w-full justify-start bg-primary hover:bg-primary/90">
                <MapPin className="w-4 h-4 mr-2" />
                Plan a New Trip
              </Button>
            </Link>
            <Link to="/rides">
              <Button variant="outline" className="w-full justify-start border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                <Car className="w-4 h-4 mr-2" />
                Book a Ride
              </Button>
            </Link>
            <Link to="/food">
              <Button variant="outline" className="w-full justify-start border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Utensils className="w-4 h-4 mr-2" />
                Find Restaurants
              </Button>
            </Link>
            <Link to="/safety">
              <Button variant="outline" className="w-full justify-start border-header text-header hover:bg-header hover:text-header-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add Safety Contact
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;