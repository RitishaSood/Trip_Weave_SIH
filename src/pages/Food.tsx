import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Utensils, Search, Star, MapPin, Clock, Phone, Filter } from "lucide-react";
import { motion } from "framer-motion";

const Food = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [reservationModal, setReservationModal] = useState<any>(null);

  const categories = [
    { id: "all", label: "All", icon: "🍽️" },
    { id: "veg", label: "Vegetarian", icon: "🥗" },
    { id: "non-veg", label: "Non-Veg", icon: "🍖" },
    { id: "local", label: "Local", icon: "🏠" },
    { id: "cafe", label: "Café", icon: "☕" },
    { id: "fine-dining", label: "Fine Dining", icon: "🍾" },
  ];

  const restaurants = [
    {
      id: 1,
      name: "Fisherman's Wharf",
      category: "non-veg",
      cuisine: "Seafood, Goan",
      description: "Waterfront dining with fresh seafood and Goan specialties",
      image: "🦐",
      rating: 4.5,
      distance: "0.8 km",
      estimatedCost: "₹800-1200",
      phone: "+91 98765 43210",
      address: "Cavelossim Beach Road",
      timing: "11:00 AM - 11:00 PM",
      specialties: ["Goan Fish Curry", "Prawns", "Bebinca"],
      isVeg: false
    },
    {
      id: 2,
      name: "Plantain Leaf",
      category: "veg",
      cuisine: "South Indian, Vegetarian",
      description: "Authentic South Indian vegetarian cuisine",
      image: "🌿",
      rating: 4.7,
      distance: "1.2 km",
      estimatedCost: "₹300-500",
      phone: "+91 87654 32109",
      address: "Panaji Market Area",
      timing: "8:00 AM - 10:00 PM",
      specialties: ["Sadhya", "Dosa", "Filter Coffee"],
      isVeg: true
    },
    {
      id: 3,
      name: "Beach Shack Café",
      category: "cafe",
      cuisine: "Continental, Beverages",
      description: "Beachside café with stunning sunset views",
      image: "🏖️",
      rating: 4.3,
      distance: "0.5 km",
      estimatedCost: "₹400-700",
      phone: "+91 76543 21098",
      address: "Baga Beach North",
      timing: "7:00 AM - 12:00 AM",
      specialties: ["Breakfast", "Smoothies", "Sunset Views"],
      isVeg: false
    },
    {
      id: 4,
      name: "Spice Route",
      category: "local",
      cuisine: "Goan, Indian",
      description: "Traditional Goan home-style cooking",
      image: "🌶️",
      rating: 4.6,
      distance: "2.1 km",
      estimatedCost: "₹500-800",
      phone: "+91 65432 10987",
      address: "Old Goa Heritage Area",
      timing: "12:00 PM - 10:00 PM",
      specialties: ["Vindaloo", "Xacuti", "Sol Kadhi"],
      isVeg: false
    },
    {
      id: 5,
      name: "The Terrace",
      category: "fine-dining",
      cuisine: "Multi-cuisine, Fine Dining",
      description: "Elegant rooftop dining with panoramic views",
      image: "🍷",
      rating: 4.8,
      distance: "1.8 km",
      estimatedCost: "₹1500-2500",
      phone: "+91 54321 09876",
      address: "Dona Paula Plateau",
      timing: "6:00 PM - 1:00 AM",
      specialties: ["Wine Pairing", "Sunset Dinner", "Live Music"],
      isVeg: false
    }
  ];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || restaurant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const reserveTable = (restaurant: any) => {
    setReservationModal(restaurant);
    // Simulate reservation
    setTimeout(() => {
      setReservationModal(null);
      alert(`Table reserved at ${restaurant.name}! You'll receive a confirmation SMS shortly.`);
    }, 2000);
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "veg": return "bg-green-500/20 text-green-700";
      case "non-veg": return "bg-red-500/20 text-red-700";
      case "local": return "bg-accent/20 text-accent";
      case "cafe": return "bg-amber-500/20 text-amber-700";
      case "fine-dining": return "bg-purple-500/20 text-purple-700";
      default: return "bg-surface text-surface-foreground";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
          <Utensils className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Discover Local Flavors</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          From beachside shacks to fine dining, explore the best culinary experiences Goa has to offer
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search restaurants, cuisines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-surface focus:border-primary"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id 
                  ? "bg-primary hover:bg-primary/90" 
                  : "border-surface hover:bg-surface"
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Restaurant Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant, index) => (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="shadow-card hover:shadow-travel transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{restaurant.image}</div>
                    <div>
                      <CardTitle className="text-lg text-foreground">{restaurant.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-foreground">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className={getCategoryBadgeColor(restaurant.category)}>
                    {categories.find(c => c.id === restaurant.category)?.label}
                  </Badge>
                  {restaurant.isVeg && (
                    <Badge className="bg-green-500/20 text-green-700">
                      Veg
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground/80">{restaurant.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{restaurant.distance} away</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{restaurant.timing}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-medium">{restaurant.estimatedCost}</span>
                    <span className="text-muted-foreground">per person</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Must Try:</p>
                  <div className="flex flex-wrap gap-1">
                    {restaurant.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => reserveTable(restaurant)}
                  >
                    <Utensils className="w-4 h-4 mr-1" />
                    Reserve Table
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredRestaurants.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Utensils className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium text-foreground mb-2">No restaurants found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}

      {/* Reservation Modal */}
      {reservationModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setReservationModal(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-card rounded-lg p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Reserving Table...
              </h3>
              <p className="text-sm text-muted-foreground">
                Processing your reservation at {reservationModal.name}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Food;