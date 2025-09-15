import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Users, DollarSign, Clock, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const TripPlanner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: "",
    budget: "",
    duration: "",
    travelers: "",
    interests: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store trip data and navigate to itinerary
    localStorage.setItem('tripPlan', JSON.stringify(formData));
    navigate('/itinerary');
  };

  const budgetRanges = [
    { value: "budget", label: "Budget (₹5,000-15,000)" },
    { value: "mid", label: "Mid-range (₹15,000-40,000)" },
    { value: "luxury", label: "Luxury (₹40,000+)" },
  ];

  const durations = [
    { value: "1-3", label: "1-3 days" },
    { value: "4-7", label: "4-7 days" },
    { value: "8-14", label: "1-2 weeks" },
    { value: "15+", label: "2+ weeks" },
  ];

  const interests = [
    "Adventure", "Culture", "Food", "Nature", "History", 
    "Beach", "Mountains", "Wildlife", "Photography", "Spiritual"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
          <MapPin className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Plan Your Perfect Trip</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Tell us about your dream destination and preferences, and we'll create a personalized itinerary just for you.
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="shadow-travel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Trip Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Destination */}
                <div className="space-y-2">
                  <Label htmlFor="destination" className="text-sm font-medium">
                    Where do you want to go?
                  </Label>
                  <Input
                    id="destination"
                    placeholder="e.g., Goa, Kerala, Rajasthan"
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                    className="border-surface focus:border-primary"
                    required
                  />
                </div>

                {/* Travelers */}
                <div className="space-y-2">
                  <Label htmlFor="travelers" className="text-sm font-medium">
                    Number of travelers
                  </Label>
                  <Select 
                    value={formData.travelers} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, travelers: value }))}
                  >
                    <SelectTrigger className="border-surface focus:border-primary">
                      <SelectValue placeholder="Select travelers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Solo traveler</SelectItem>
                      <SelectItem value="2">2 people</SelectItem>
                      <SelectItem value="3-5">3-5 people</SelectItem>
                      <SelectItem value="6+">6+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Start Date */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-surface",
                          !formData.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-surface",
                          !formData.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Budget */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Budget Range
                  </Label>
                  <Select 
                    value={formData.budget} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                  >
                    <SelectTrigger className="border-surface focus:border-primary">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Trip Duration
                  </Label>
                  <Select 
                    value={formData.duration} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
                  >
                    <SelectTrigger className="border-surface focus:border-primary">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((duration) => (
                        <SelectItem key={duration.value} value={duration.value}>
                          {duration.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">What interests you most?</Label>
                <Textarea
                  placeholder="Tell us about your interests, activities you enjoy, or specific places you want to visit..."
                  value={formData.interests}
                  onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                  className="min-h-[100px] border-surface focus:border-primary"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {interests.map((interest) => (
                    <Button
                      key={interest}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs border-surface hover:bg-primary hover:text-primary-foreground"
                      onClick={() => setFormData(prev => ({ 
                        ...prev, 
                        interests: prev.interests ? `${prev.interests}, ${interest}` : interest 
                      }))}
                    >
                      {interest}
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                size="lg"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate My Itinerary
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TripPlanner;