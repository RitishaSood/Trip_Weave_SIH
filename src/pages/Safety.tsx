import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, AlertTriangle, Phone, Plus, Trash2, Share, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Safety = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      phone: "+91 98765 43210",
      relation: "Sister",
      avatar: "👩‍💼"
    },
    {
      id: 2,
      name: "Raj Kumar",
      phone: "+91 87654 32109",
      relation: "Father",
      avatar: "👨‍💼"
    },
    {
      id: 3,
      name: "Dr. Amit Singh",
      phone: "+91 76543 21098",
      relation: "Family Doctor",
      avatar: "👨‍⚕️"
    }
  ]);

  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relation: ""
  });

  const [sosActive, setSosActive] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const emergencyNumbers = [
    { service: "Police", number: "100", icon: "🚔" },
    { service: "Medical Emergency", number: "108", icon: "🚑" },
    { service: "Fire Brigade", number: "101", icon: "🚒" },
    { service: "Tourist Helpline", number: "1363", icon: "🏛️" }
  ];

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      const contact = {
        ...newContact,
        id: Date.now(),
        avatar: "👤"
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: "", phone: "", relation: "" });
      setShowAddForm(false);
    }
  };

  const removeContact = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const activateSOS = () => {
    setSosActive(true);
    // Simulate SOS alert storage in Firebase
    const sosAlert = {
      timestamp: new Date().toISOString(),
      location: "Current GPS Location",
      status: "Active",
      contacts: contacts
    };
    console.log("SOS Alert stored:", sosAlert);
    
    setTimeout(() => {
      setSosActive(false);
      alert("SOS alert sent to all emergency contacts!");
    }, 3000);
  };

  const shareLocation = () => {
    const shareLink = `https://tripweave.app/track/${Date.now()}`;
    navigator.clipboard?.writeText(shareLink);
    alert("Live location link copied to clipboard!");
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
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Safety Center</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your safety is our priority. Quick access to emergency services and trusted contacts.
        </p>
      </motion.div>

      {/* SOS Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="shadow-travel border-2 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-center justify-center">
              <AlertTriangle className="w-5 h-5 text-accent" />
              Emergency SOS
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Press and hold for 3 seconds to send emergency alert to all contacts
            </p>
            <Button
              size="lg"
              onClick={activateSOS}
              disabled={sosActive}
              className={`w-32 h-32 rounded-full text-xl font-bold ${
                sosActive 
                  ? "bg-red-600 animate-pulse" 
                  : "bg-accent hover:bg-accent/90 hover:shadow-glow"
              }`}
            >
              {sosActive ? (
                <div className="text-center">
                  <AlertTriangle className="w-8 h-8 mb-1" />
                  <div>Alerting...</div>
                </div>
              ) : (
                <div className="text-center">
                  <Shield className="w-8 h-8 mb-1" />
                  <div>SOS</div>
                </div>
              )}
            </Button>
            {sosActive && (
              <p className="text-red-600 font-medium animate-pulse">
                Sending emergency alert to contacts...
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Emergency Contacts
                </CardTitle>
                <Button
                  size="sm"
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {showAddForm && (
                <div className="bg-surface/50 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="name" className="text-sm">Name</Label>
                      <Input
                        id="name"
                        placeholder="Contact name"
                        value={newContact.name}
                        onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="relation" className="text-sm">Relation</Label>
                      <Input
                        id="relation"
                        placeholder="Relation"
                        value={newContact.relation}
                        onChange={(e) => setNewContact(prev => ({ ...prev, relation: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={newContact.phone}
                      onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={addContact} className="bg-primary hover:bg-primary/90">
                      Add Contact
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {contacts.map((contact) => (
                <div key={contact.id} className="flex items-center gap-3 p-3 rounded-lg bg-surface/30">
                  <div className="text-2xl">{contact.avatar}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.relation}</p>
                    <p className="text-sm text-primary">{contact.phone}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => removeContact(contact.id)}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Emergency Numbers */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-secondary" />
                Emergency Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {emergencyNumbers.map((service, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-surface/30">
                  <div className="text-2xl">{service.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{service.service}</h3>
                    <p className="text-lg font-bold text-secondary">{service.number}</p>
                  </div>
                  <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Location Sharing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Live Location Sharing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Share your live location and trip status with trusted contacts
            </p>
            
            <div className="bg-surface/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground mb-1">Current Trip Status</h3>
                  <p className="text-sm text-muted-foreground">
                    🚗 En route to Baga Beach • ETA: 15 mins
                  </p>
                </div>
                <Button onClick={shareLocation} className="bg-primary hover:bg-primary/90">
                  <Share className="w-4 h-4 mr-2" />
                  Share Location
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>✓ GPS tracking enabled</p>
              <p>✓ Trip details shared with emergency contacts</p>
              <p>✓ Auto-alerts if delayed beyond expected time</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Safety;