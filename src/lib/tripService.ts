// src/lib/tripService.ts
import { db } from "@/integrations/firebase2/client";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

const TRIPS_COLLECTION = "trips";

// ✅ Start a new trip with optional start location
export const startTrip = async (tripData: any, coords?: GeolocationCoordinates) => {
  const docId = `${tripData.startDate}_${tripData.tripId}_${tripData.destination}`;
  await setDoc(doc(db, TRIPS_COLLECTION, docId), {
    ...tripData,
    status: "inProgress",
    createdAt: new Date().toISOString(),
    startLocation: coords
      ? { lat: coords.latitude, lng: coords.longitude, accuracy: coords.accuracy }
      : null,
  });
  return docId;
};

// ✅ Add a destination inside trip with custom ID (date_destinationName) + start/end locations
export const addDestination = async (
  tripId: string,
  destinationData: any,
  startCoords?: GeolocationCoordinates,
  endCoords?: GeolocationCoordinates
) => {
  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const safeName = destinationData.name.replace(/\s+/g, "_"); // sanitize spaces
  const destId = `${date}_${safeName}`;

  const destRef = doc(db, TRIPS_COLLECTION, tripId, "destinations", destId);

  await setDoc(destRef, {
    ...destinationData,
    createdAt: new Date().toISOString(),
    startLocation: startCoords
      ? { lat: startCoords.latitude, lng: startCoords.longitude }
      : null,
    endLocation: endCoords
      ? { lat: endCoords.latitude, lng: endCoords.longitude }
      : null,
  });

  return destId;
};

// ✅ End the trip with optional end location
export const endTrip = async (tripId: string, coords?: GeolocationCoordinates) => {
  await updateDoc(doc(db, TRIPS_COLLECTION, tripId), {
    status: "completed",
    endTime: new Date().toISOString(),
    endLocation: coords
      ? { lat: coords.latitude, lng: coords.longitude, accuracy: coords.accuracy }
      : null,
  });
};

// ✅ Fetch all trips
export const getTrips = async () => {
  const querySnap = await getDocs(collection(db, TRIPS_COLLECTION));
  return querySnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// ✅ Fetch destinations of a trip
export const getDestinations = async (tripId: string) => {
  const querySnap = await getDocs(
    collection(db, TRIPS_COLLECTION, tripId, "destinations")
  );
  return querySnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
