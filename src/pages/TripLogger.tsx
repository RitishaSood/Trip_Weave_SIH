"use client";

import { useState } from "react";
import {
  startTrip,
  addDestination,
  endTrip,
} from "@/lib/tripService";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function TripLogger() {
  const [tripState, setTripState] = useState<"planning" | "inProgress" | "completed">("planning");
  const [tripId, setTripId] = useState<string | null>(null);
  const [destinations, setDestinations] = useState<any[]>([]);

  // GPS State
  const [tripStartCoords, setTripStartCoords] = useState<GeolocationCoordinates | null>(null);
  const [tripEndCoords, setTripEndCoords] = useState<GeolocationCoordinates | null>(null);
  const [destStartCoords, setDestStartCoords] = useState<GeolocationCoordinates | null>(null);
  const [destEndCoords, setDestEndCoords] = useState<GeolocationCoordinates | null>(null);

  // ---------------- Trip Form State ----------------
  const [tripForm, setTripForm] = useState<any>({
    from: "",
    destination: "",
    mode: "",
    outgoingCost: "",
    returnCost: "",
    startDate: "",
    endDate: "",
    gpsEnabled: false,
  });

  // ---------------- Destination Form State ----------------
  const [destinationForm, setDestinationForm] = useState<any>({
    name: "",
    transportCost: "",
    foodCost: "",
    entryCost: "",
    arrivalTime: "",
    departureTime: "",
    notes: "",
  });

  // ---------------- Handlers ----------------
  const handleTripChange = (e: any) => {
    setTripForm({ ...tripForm, [e.target.name]: e.target.value });
  };

  const handleDestinationChange = (e: any) => {
    setDestinationForm({ ...destinationForm, [e.target.name]: e.target.value });
  };

  // Capture GPS helper
  const captureLocation = (cb: (coords: GeolocationCoordinates) => void) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => cb(pos.coords),
      (err) => alert("Location error: " + err.message)
    );
  };

  // ---------------- Start Trip ----------------
  const handleStartTrip = async () => {
    const tripData = {
      ...tripForm,
      tripId: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const id = await startTrip(tripData, tripStartCoords || undefined);
    setTripId(id);
    setTripState("inProgress");
  };

  // ---------------- Add Destination ----------------
  const handleAddDestination = async () => {
    if (!tripId) return;
    await addDestination(tripId, destinationForm, destStartCoords || undefined, destEndCoords || undefined);
    setDestinations([...destinations, destinationForm]);
    setDestinationForm({
      name: "",
      transportCost: "",
      foodCost: "",
      entryCost: "",
      arrivalTime: "",
      departureTime: "",
      notes: "",
    });
    setDestStartCoords(null);
    setDestEndCoords(null);
  };

  // ---------------- End Trip ----------------
  const handleEndTrip = async () => {
    if (!tripId) return;
    await endTrip(tripId, tripEndCoords || undefined);
    setTripState("completed");
  };

  // ---------------- UI ----------------
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-600">Travel Expense Tracker</h1>

      {/* Step 1: Planning */}
      {tripState === "planning" && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>From</Label><Input name="from" value={tripForm.from} onChange={handleTripChange} /></div>
            <div><Label>To</Label><Input name="destination" value={tripForm.destination} onChange={handleTripChange} /></div>
            <div><Label>Mode of Travel</Label><Input name="mode" value={tripForm.mode} onChange={handleTripChange} /></div>
            <div><Label>Outgoing Cost (Rs.)</Label><Input name="outgoingCost" value={tripForm.outgoingCost} onChange={handleTripChange} /></div>
            <div><Label>Return Cost (Rs.)</Label><Input name="returnCost" value={tripForm.returnCost} onChange={handleTripChange} /></div>
            <div><Label>Departure Date</Label><Input type="date" name="startDate" value={tripForm.startDate} onChange={handleTripChange} /></div>
            <div><Label>Return Date</Label><Input type="date" name="endDate" value={tripForm.endDate} onChange={handleTripChange} /></div>
            <div className="flex items-center space-x-2 col-span-2">
              <Switch checked={tripForm.gpsEnabled} onCheckedChange={(val) => setTripForm({ ...tripForm, gpsEnabled: val })} />
              <Label>Enable GPS Tracking</Label>
            </div>
          </div>
          <Button className="mt-3 w-full bg-purple-500" onClick={() => captureLocation(setTripStartCoords)}>
            📍 Capture Start Location
          </Button>
          <Button className="mt-3 w-full" onClick={handleStartTrip}>
            🚀 Start Trip
          </Button>
        </Card>
      )}

      {/* Step 2: Ongoing Trip */}
      {tripState === "inProgress" && (
        <div className="space-y-6">
          {/* Current Destinations */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Current Trip Destinations</h2>
            {destinations.length === 0 && <p>No destinations added yet.</p>}
            {destinations.map((d, idx) => (
              <Card key={idx} className="p-4 shadow">
                <p className="font-bold">{d.name}</p>
                <p>Fare: Rs.{d.transportCost} | Food: Rs.{d.foodCost} | Entry: Rs.{d.entryCost}</p>
                <p>Arrival: {d.arrivalTime} | Departure: {d.departureTime}</p>
                <p className="text-gray-500">{d.notes}</p>
              </Card>
            ))}
          </Card>

          {/* Add Destination */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">➕ Add Destination</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Destination Name</Label><Input name="name" value={destinationForm.name} onChange={handleDestinationChange} /></div>
              <div><Label>Transportation Fare (Rs.)</Label><Input name="transportCost" value={destinationForm.transportCost} onChange={handleDestinationChange} /></div>
              <div><Label>Food Cost (Rs.)</Label><Input name="foodCost" value={destinationForm.foodCost} onChange={handleDestinationChange} /></div>
              <div><Label>Entry Cost (Rs.)</Label><Input name="entryCost" value={destinationForm.entryCost} onChange={handleDestinationChange} /></div>
              <div><Label>Arrival Time</Label><Input type="datetime-local" name="arrivalTime" value={destinationForm.arrivalTime} onChange={handleDestinationChange} /></div>
              <div><Label>Departure Time</Label><Input type="datetime-local" name="departureTime" value={destinationForm.departureTime} onChange={handleDestinationChange} /></div>
              <div className="col-span-2"><Label>Notes</Label><Textarea name="notes" value={destinationForm.notes} onChange={handleDestinationChange} /></div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button className="w-1/2 bg-purple-500" onClick={() => captureLocation(setDestStartCoords)}>📍 Capture Start</Button>
              <Button className="w-1/2 bg-purple-700" onClick={() => captureLocation(setDestEndCoords)}>📍 Capture End</Button>
            </div>
            <Button className="mt-4 w-full bg-orange-500" onClick={handleAddDestination}>
              ➕ Save Destination
            </Button>
          </Card>

          {/* End Trip */}
          <Button className="w-full bg-purple-600" onClick={() => captureLocation(setTripEndCoords)}>
            📍 Capture Trip End Location
          </Button>
          <Button className="w-full bg-green-600 mt-3" onClick={handleEndTrip}>
            ✅ End Trip
          </Button>
        </div>
      )}

      {/* Step 3: Completed */}
      {tripState === "completed" && (
        <Card className="p-6 text-center">
          <h2 className="text-xl font-bold mb-4 text-green-600">🎉 Trip Completed!</h2>
          <p>View your expense summary in Firestore.</p>
        </Card>
      )}
    </div>
  );
}
