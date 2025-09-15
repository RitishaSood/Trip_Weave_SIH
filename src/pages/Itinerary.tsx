import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, AlertTriangle, Map, Camera, Star } from "lucide-react";
import { motion } from "framer-motion";

const Itinerary = () => {
  const [tripPlan, setTripPlan] = useState<any>(null);
  const [pois, setPois] = useState<any[]>([]);
  const [showDelay, setShowDelay] = useState(false);

  useEffect(() => {
    // Load trip plan from localStorage
    const savedPlan = localStorage.getItem('tripPlan');
    if (savedPlan) {
      setTripPlan(JSON.parse(savedPlan));
    }

    // Generate POIs based on destination
    generatePOIs();
  }, []);

  const generatePOIs = () => {
    // Mock POI data - in real app, this would come from your JSON dataset
    const mockPOIs = [
      {
        id: 1,
        name: "Fort Aguada",
        category: "Historical",
        description: "17th-century Portuguese fort with stunning views",
        estimatedTime: "2 hours",
        cost: "₹100",
        image: "🏰",
        coordinates: { lat: 15.4909, lng: 73.7732 },
        rating: 4.5,
        isOpen: true
      },
      {
        id: 2,
        name: "Baga Beach",
        category: "Beach",
        description: "Popular beach with water sports and nightlife",
        estimatedTime: "4 hours",
        cost: "₹500",
        image: "🏖️",
        coordinates: { lat: 15.5557, lng: 73.7517 },
        rating: 4.3,
        isOpen: true
      },
      {
        id: 3,
        name: "Spice Plantation Tour",
        category: "Nature",
        description: "Authentic spice garden with traditional lunch",
        estimatedTime: "3 hours",
        cost: "₹800",
        image: "🌿",
        coordinates: { lat: 15.3173, lng: 74.1240 },
        rating: 4.7,
        isOpen: true
      },
      {
        id: 4,
        name: "Old Goa Churches",
        category: "Religious",
        description: "UNESCO World Heritage churches and cathedrals",
        estimatedTime: "3 hours",
        cost: "₹50",
        image: "⛪",
        coordinates: { lat: 15.5007, lng: 73.9114 },
        rating: 4.6,
        isOpen: true
      },
      {
        id: 5,
        name: "Dudhsagar Falls",
        category: "Nature",
        description: "Majestic four-tiered waterfall in the Western Ghats",
        estimatedTime: "Full day",
        cost: "₹1200",
        image: "💧",
        coordinates: { lat: 15.3142, lng: 74.3143 },
        rating: 4.8,
        isOpen: false // This will be affected by delay simulation
      }
    ];

    setPois(mockPOIs);
  };

  const simulateDelay = () => {
    setShowDelay(true);
    // Simulate closure of Dudhsagar Falls and reorder POIs
    setPois(prevPois => 
      prevPois.map(poi => 
        poi.id === 5 
          ? { ...poi, isOpen: false, delayReason: "Temporarily closed due to heavy rainfall" }
          : poi
      ).sort((a, b) => b.isOpen - a.isOpen) // Move closed POIs to end
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Historical": return "bg-header/20 text-header";
      case "Beach": return "bg-primary/20 text-primary";
      case "Nature": return "bg-accent/20 text-accent";
      case "Religious": return "bg-secondary/20 text-secondary";
      default: return "bg-surface text-surface-foreground";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-surface rounded-xl p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Your Goa Adventure Itinerary
            </h1>
            <p className="text-muted-foreground">
              {tripPlan?.startDate && tripPlan?.endDate ? 
                `${new Date(tripPlan.startDate).toDateString()} - ${new Date(tripPlan.endDate).toDateString()}` :
                "5 days of amazing experiences"
              } • {tripPlan?.travelers || "2"} travelers
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={simulateDelay}
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Simulate Delay
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Map className="w-4 h-4 mr-2" />
              View on Map
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Delay Alert */}
      {showDelay && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-accent/10 border border-accent/20 rounded-lg p-4"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-accent" />
            <span className="font-medium text-accent">Itinerary Updated</span>
          </div>
          <p className="text-sm text-foreground/80 mt-1">
            Some locations have been affected by weather conditions. We've reorganized your itinerary accordingly.
          </p>
        </motion.div>
      )}

      {/* POI Cards */}
      <div className="grid gap-6">
        {pois.map((poi, index) => (
          <motion.div
            key={poi.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`shadow-card hover:shadow-travel transition-all duration-300 ${
              !poi.isOpen ? 'opacity-60 border-destructive/20' : ''
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{poi.image}</div>
                    <div>
                      <CardTitle className="text-xl text-foreground">{poi.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getCategoryColor(poi.category)}>
                          {poi.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-muted-foreground">{poi.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Day {Math.ceil((index + 1) / 2)}</p>
                    {!poi.isOpen && (
                      <Badge variant="destructive" className="mt-1">
                        Closed
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-4">{poi.description}</p>
                
                {poi.delayReason && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-4">
                    <p className="text-sm text-destructive font-medium">⚠️ {poi.delayReason}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{poi.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{poi.cost}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {poi.coordinates.lat.toFixed(4)}, {poi.coordinates.lng.toFixed(4)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90"
                    disabled={!poi.isOpen}
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Get Directions
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    disabled={!poi.isOpen}
                  >
                    <Camera className="w-4 h-4 mr-1" />
                    Photos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Map Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="w-5 h-5 text-primary" />
            Interactive Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-surface/50 rounded-lg flex items-center justify-center border-2 border-dashed border-surface">
            <div className="text-center">
              <Map className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Google Maps will be integrated here</p>
              <p className="text-sm text-muted-foreground/60">
                Showing all POI locations with directions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Itinerary;