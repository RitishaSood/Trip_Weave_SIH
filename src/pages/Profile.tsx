import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Calendar, Edit3, Save, Camera, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("👤");
  const [profile, setProfile] = useState({
    name: "Alex Traveler",
    email: "alex@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    bio: "Passionate traveler exploring India's diverse landscapes and cultures."
  });

  const avatarOptions = [
    "👤", "👨‍💼", "👩‍💼", "👨‍🎓", "👩‍🎓", "🧑‍💻", "👨‍🚀", "👩‍🚀",
    "🧑‍🎨", "👨‍🍳", "👩‍🍳", "🧑‍⚕️", "👨‍🌾", "👩‍🌾", "🧑‍🏫", "👨‍✈️"
  ];

  const tripHistory = [
    {
      destination: "Goa Beach Paradise",
      date: "Nov 2024",
      duration: "5 days",
      status: "Completed",
      rating: 5,
      image: "🏖️"
    },
    {
      destination: "Kerala Backwaters",
      date: "Oct 2024",
      duration: "4 days",
      status: "Completed",
      rating: 4,
      image: "🚢"
    },
    {
      destination: "Himalayan Trek",
      date: "Dec 2024",
      duration: "7 days",
      status: "Upcoming",
      rating: null,
      image: "🏔️"
    }
  ];

  const stats = [
    { label: "Trips Completed", value: "12", icon: MapPin },
    { label: "Countries Visited", value: "3", icon: MapPin },
    { label: "Days Traveled", value: "89", icon: Calendar },
    { label: "Avg Rating", value: "4.7", icon: Star }
  ];

  const saveProfile = () => {
    setIsEditing(false);
    // Here you would normally save to Firebase
    console.log("Profile saved:", profile);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500/20 text-green-700";
      case "Upcoming": return "bg-primary/20 text-primary";
      case "Cancelled": return "bg-red-500/20 text-red-700";
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
          <User className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
        <p className="text-muted-foreground">
          Manage your travel preferences and view your journey history
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="shadow-travel">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                <Button
                  size="sm"
                  onClick={() => isEditing ? saveProfile() : setIsEditing(true)}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4 mr-1" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Selection */}
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center text-4xl border-4 border-primary/20">
                    {selectedAvatar}
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary hover:bg-primary/90"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                {isEditing && (
                  <div className="grid grid-cols-8 gap-2 p-4 bg-surface/50 rounded-lg">
                    {avatarOptions.map((avatar) => (
                      <button
                        key={avatar}
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`w-8 h-8 text-lg rounded-lg hover:bg-primary/20 transition-colors ${
                          selectedAvatar === avatar ? 'bg-primary/30 ring-2 ring-primary' : 'bg-surface'
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-foreground font-medium">{profile.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-foreground">{profile.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-foreground">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-foreground flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      {profile.location}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                  {isEditing ? (
                    <textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      className="mt-1 w-full p-2 border border-input rounded-md text-sm"
                      rows={3}
                    />
                  ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{profile.bio}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-4">
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Trip History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Trip History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tripHistory.map((trip, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-surface/30 hover:bg-surface/50 transition-colors">
                    <div className="text-3xl">{trip.image}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{trip.destination}</h3>
                      <p className="text-sm text-muted-foreground">{trip.date} • {trip.duration}</p>
                      {trip.rating && (
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < trip.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <Badge className={getStatusColor(trip.status)}>
                      {trip.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Button className="h-16 bg-primary hover:bg-primary/90 flex-col gap-2">
                  <MapPin className="w-5 h-5" />
                  Plan New Trip
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                  <Calendar className="w-5 h-5" />
                  View Calendar
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  <Star className="w-5 h-5" />
                  Rate Trips
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2 border-header text-header hover:bg-header hover:text-header-foreground">
                  <User className="w-5 h-5" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;