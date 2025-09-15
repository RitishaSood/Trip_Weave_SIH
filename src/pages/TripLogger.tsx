import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, MapPin, Clock, Users, Car, Database, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const TripLogger = () => {
  const [currentTrip, setCurrentTrip] = useState<any>(null);
  const [tripLogs, setTripLogs] = useState<any[]>([]);
  const [isLogging, setIsLogging] = useState(false);
  const [consent, setConsent] = useState(false);

  const [tripData, setTripData] = useState({
    tripId: "",
    origin: "",
    destination: "",
    startTime: "",
    endTime: "",
    travelMode: "",
    companions: "",
    companionDetails: "",
    purpose: "",
    notes: ""
  });

  const travelModes = [
    { value: "auto", label: "Auto Rickshaw", icon: "🛺" },
    { value: "bus", label: "Bus", icon: "🚌" },
    { value: "car", label: "Car", icon: "🚗" },
    { value: "walk", label: "Walking", icon: "🚶" },
    { value: "bike", label: "Motorcycle", icon: "🏍️" },
    { value: "train", label: "Train", icon: "🚂" },
    { value: "flight", label: "Flight", icon: "✈️" },
    { value: "boat", label: "Boat", icon: "🛥️" }
  ];

  useEffect(() => {
    // Load existing trip logs from localStorage (in real app, from Firebase)
    const savedLogs = localStorage.getItem('tripLogs');
    if (savedLogs) {
      setTripLogs(JSON.parse(savedLogs));
    }
  }, []);

  const startTrip = () => {
    if (!consent) {
      alert("Please provide consent for data sharing before starting trip logging.");
      return;
    }

    const newTrip = {
      ...tripData,
      tripId: `TRIP_${Date.now()}`,
      startTime: new Date().toISOString(),
      origin: "Current GPS Location", // In real app, get from GPS
      status: "ongoing"
    };
    
    setCurrentTrip(newTrip);
    setIsLogging(true);
  };

  const endTrip = () => {
    if (!currentTrip) return;

    const completedTrip = {
      ...currentTrip,
      endTime: new Date().toISOString(),
      status: "completed",
      dataSaved: true
    };

    const updatedLogs = [...tripLogs, completedTrip];
    setTripLogs(updatedLogs);
    localStorage.setItem('tripLogs', JSON.stringify(updatedLogs));
    
    // Simulate saving to Firebase Firestore
    console.log("Trip data saved to Firestore:", completedTrip);
    
    setCurrentTrip(null);
    setIsLogging(false);
    setTripData({
      tripId: "",
      origin: "",
      destination: "",
      startTime: "",
      endTime: "",
      travelMode: "",
      companions: "",
      companionDetails: "",
      purpose: "",
      notes: ""
    });

    alert("Trip logged successfully! Data saved for NATPAC research.");
  };

  const exportData = () => {
    const dataStr = JSON.stringify(tripLogs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `tripweave_data_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getTravelModeIcon = (mode: string) => {
    const modeObj = travelModes.find(m => m.value === mode);
    return modeObj ? modeObj.icon : "🚗";
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
          <ClipboardList className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Trip Logger</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Help improve transportation research by sharing your travel data with NATPAC. 
          Your data contributes to better transportation planning and policy.
        </p>
      </motion.div>

      {/* NATPAC Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Database className="w-5 h-5" />
              NATPAC Research Initiative
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 mb-4">
              The National Transportation Planning and Research Centre (NATPAC) uses anonymized travel data 
              to improve transportation infrastructure and policies across India. Your contribution helps:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Optimize public transportation routes and schedules</li>
              <li>Plan better road infrastructure development</li>
              <li>Understand travel patterns and preferences</li>
              <li>Develop sustainable transportation solutions</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Current Trip Status */}
      {isLogging && currentTrip && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="shadow-travel border-2 border-accent/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent animate-pulse" />
                  Trip in Progress
                </CardTitle>
                <Badge className="bg-accent/20 text-accent animate-pulse">
                  Logging Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-surface/50 rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Trip ID</p>
                    <p className="font-mono text-sm text-foreground">{currentTrip.tripId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Started</p>
                    <p className="font-medium text-foreground">
                      {new Date(currentTrip.startTime).toLocaleTimeString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mode</p>
                    <p className="text-lg">{getTravelModeIcon(currentTrip.travelMode)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Companions</p>
                    <p className="font-medium text-foreground">{currentTrip.companions || "0"}</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={endTrip}
                className="w-full bg-secondary hover:bg-secondary/90"
                size="lg"
              >
                <Check className="w-4 h-4 mr-2" />
                End Trip & Save Data
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Trip Logging Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Log New Trip</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="Where are you going?"
                    value={tripData.destination}
                    onChange={(e) => setTripData(prev => ({ ...prev, destination: e.target.value }))}
                    disabled={isLogging}
                  />
                </div>
                <div>
                  <Label htmlFor="purpose">Trip Purpose</Label>
                  <Select 
                    value={tripData.purpose} 
                    onValueChange={(value) => setTripData(prev => ({ ...prev, purpose: value }))}
                    disabled={isLogging}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tourism">Tourism</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="commute">Daily Commute</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="travelMode">Travel Mode</Label>
                  <Select 
                    value={tripData.travelMode} 
                    onValueChange={(value) => setTripData(prev => ({ ...prev, travelMode: value }))}
                    disabled={isLogging}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      {travelModes.map((mode) => (
                        <SelectItem key={mode.value} value={mode.value}>
                          <span className="flex items-center gap-2">
                            {mode.icon} {mode.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="companions">Number of Companions</Label>
                  <Input
                    id="companions"
                    type="number"
                    placeholder="0"
                    value={tripData.companions}
                    onChange={(e) => setTripData(prev => ({ ...prev, companions: e.target.value }))}
                    disabled={isLogging}
                  />
                </div>
              </div>

              {parseInt(tripData.companions) > 0 && (
                <div>
                  <Label htmlFor="companionDetails">Companion Details</Label>
                  <Textarea
                    id="companionDetails"
                    placeholder="Age groups, relationships (e.g., 2 adults, 1 child)"
                    value={tripData.companionDetails}
                    onChange={(e) => setTripData(prev => ({ ...prev, companionDetails: e.target.value }))}
                    disabled={isLogging}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Weather conditions, traffic, special circumstances..."
                  value={tripData.notes}
                  onChange={(e) => setTripData(prev => ({ ...prev, notes: e.target.value }))}
                  disabled={isLogging}
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start space-x-2 p-4 bg-surface/50 rounded-lg">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked as boolean)}
                  disabled={isLogging}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="consent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Data Sharing Consent
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    I consent to sharing my anonymized travel data with NATPAC for transportation research. 
                    No personal identifiable information will be shared.
                  </p>
                </div>
              </div>

              <Button
                onClick={startTrip}
                disabled={!consent || !tripData.destination || !tripData.travelMode || isLogging}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                {isLogging ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-pulse" />
                    Logging in Progress...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 mr-2" />
                    Start Trip Logging
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trip History & Export */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Export Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-secondary" />
                Data Export
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Export your trip data for researchers or personal records.
              </p>
              <div className="flex items-center justify-between p-3 bg-surface/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Total Trips Logged</p>
                  <p className="text-sm text-muted-foreground">{tripLogs.length} trips recorded</p>
                </div>
                <Button 
                  onClick={exportData}
                  disabled={tripLogs.length === 0}
                  className="bg-secondary hover:bg-secondary/90"
                >
                  Export JSON
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Trips */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Trip Logs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tripLogs.length === 0 ? (
                <div className="text-center py-8">
                  <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No trips logged yet</p>
                </div>
              ) : (
                tripLogs.slice(-5).reverse().map((trip, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-surface/30">
                    <div className="text-xl">{getTravelModeIcon(trip.travelMode)}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground text-sm">
                        To: {trip.destination}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(trip.startTime).toLocaleDateString()} • 
                        {trip.companions ? ` ${trip.companions} companions` : ' Solo trip'}
                      </p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-700 text-xs">
                      <Check className="w-3 h-3 mr-1" />
                      Saved
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TripLogger;