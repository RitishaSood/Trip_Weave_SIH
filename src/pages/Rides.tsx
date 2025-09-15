import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Car, Phone, Star, MapPin, Clock, User, Navigation } from "lucide-react";
import { motion } from "framer-motion";

const Rides = () => {
  const [currentRide, setCurrentRide] = useState<any>(null);
  const [rideStatus, setRideStatus] = useState<'searching' | 'assigned' | 'ongoing' | 'completed'>('searching');
  const [assignedDriver, setAssignedDriver] = useState<any>(null);

  const drivers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      vehicle: "Maruti Swift",
      vehicleNumber: "GA 01 AB 1234",
      photo: "👨‍💼",
      rating: 4.8,
      phone: "+91 98765 43210",
      estimatedArrival: "5 mins",
      currentLocation: { lat: 15.4909, lng: 73.7732 }
    },
    {
      id: 2,
      name: "Priya Sharma",
      vehicle: "Honda City",
      vehicleNumber: "GA 02 CD 5678",
      photo: "👩‍💼",
      rating: 4.9,
      phone: "+91 87654 32109",
      estimatedArrival: "8 mins",
      currentLocation: { lat: 15.4909, lng: 73.7732 }
    },
    {
      id: 3,
      name: "Mohammed Ali",
      vehicle: "Hyundai i20",
      vehicleNumber: "GA 03 EF 9012",
      photo: "👨‍🦱",
      rating: 4.7,
      phone: "+91 76543 21098",
      estimatedArrival: "3 mins",
      currentLocation: { lat: 15.4909, lng: 73.7732 }
    }
  ];

  const bookRide = () => {
    setRideStatus('searching');
    
    // Simulate driver assignment after 2 seconds
    setTimeout(() => {
      const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
      setAssignedDriver(randomDriver);
      setRideStatus('assigned');
      setCurrentRide({
        id: Date.now(),
        from: "Fort Aguada",
        to: "Baga Beach",
        distance: "12 km",
        estimatedTime: "25 mins",
        fare: "₹280"
      });
    }, 2000);
  };

  const startRide = () => {
    setRideStatus('ongoing');
  };

  const completeRide = () => {
    setRideStatus('completed');
  };

  const getRideStatusColor = () => {
    switch (rideStatus) {
      case 'searching': return 'bg-yellow-500/20 text-yellow-700';
      case 'assigned': return 'bg-primary/20 text-primary';
      case 'ongoing': return 'bg-secondary/20 text-secondary';
      case 'completed': return 'bg-green-500/20 text-green-700';
      default: return 'bg-surface text-surface-foreground';
    }
  };

  const getRideStatusText = () => {
    switch (rideStatus) {
      case 'searching': return 'Searching for driver...';
      case 'assigned': return 'Driver assigned';
      case 'ongoing': return 'Ride in progress';
      case 'completed': return 'Ride completed';
      default: return 'Ready to book';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
          <Car className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Book Your Ride</h1>
        <p className="text-muted-foreground">
          Safe, reliable transportation to your destination
        </p>
      </motion.div>

      {/* Current Ride Status */}
      {(rideStatus !== 'searching' || currentRide) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="shadow-travel">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-primary" />
                  Current Ride
                </CardTitle>
                <Badge className={getRideStatusColor()}>
                  {getRideStatusText()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentRide && (
                <div className="bg-surface/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{currentRide.from}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">→</div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{currentRide.to}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Distance</p>
                      <p className="font-medium text-foreground">{currentRide.distance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium text-foreground">{currentRide.estimatedTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Fare</p>
                      <p className="font-medium text-primary">{currentRide.fare}</p>
                    </div>
                  </div>
                </div>
              )}

              {assignedDriver && (
                <div className="bg-surface/30 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{assignedDriver.photo}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{assignedDriver.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {assignedDriver.vehicle} • {assignedDriver.vehicleNumber}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-foreground">{assignedDriver.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Arrives in</p>
                      <p className="font-medium text-primary">{assignedDriver.estimatedArrival}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="w-4 h-4 mr-1" />
                      Call Driver
                    </Button>
                    {rideStatus === 'assigned' && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={startRide}
                      >
                        Start Ride
                      </Button>
                    )}
                    {rideStatus === 'ongoing' && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-secondary hover:bg-secondary/90"
                        onClick={completeRide}
                      >
                        Complete Ride
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Live Tracking Map */}
      {rideStatus === 'ongoing' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-primary" />
                Live Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-surface/50 rounded-lg flex items-center justify-center border-2 border-dashed border-surface">
                <div className="text-center">
                  <Navigation className="w-12 h-12 text-primary mx-auto mb-2 animate-pulse" />
                  <p className="text-foreground font-medium">Tracking your ride live</p>
                  <p className="text-sm text-muted-foreground">
                    Google Maps integration with real-time location
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Book New Ride */}
      {rideStatus === 'searching' && !currentRide && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Book a New Ride</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-surface/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Current Location</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Fort Aguada</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm text-foreground">Destination</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Baga Beach</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center bg-surface/30 rounded-lg p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Distance</p>
                  <p className="font-medium text-foreground">12 km</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium text-foreground">25 mins</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fare</p>
                  <p className="font-medium text-primary">₹280</p>
                </div>
              </div>

              <Button 
                onClick={bookRide}
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                <Car className="w-4 h-4 mr-2" />
                Book Ride Now
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Searching Animation */}
      {rideStatus === 'searching' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Finding your driver...</h2>
          <p className="text-muted-foreground">We're matching you with the best available driver</p>
        </motion.div>
      )}

      {/* Ride Completed */}
      {rideStatus === 'completed' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Ride Completed!</h2>
          <p className="text-muted-foreground mb-4">Thank you for choosing TripWeave</p>
          <Button 
            onClick={() => {
              setRideStatus('searching');
              setCurrentRide(null);
              setAssignedDriver(null);
            }}
            className="bg-primary hover:bg-primary/90"
          >
            Book Another Ride
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Rides;