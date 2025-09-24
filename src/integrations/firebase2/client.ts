// src/integrations/firebase2/client.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLAyNsJZcJjfx2-8jvvQXO3XBHfOEqamU",
  authDomain: "tripweave-637df.firebaseapp.com",
  projectId: "tripweave-637df",
  storageBucket: "tripweave-637df.firebasestorage.app",
  messagingSenderId: "600018873778",
  appId: "1:600018873778:web:ca606379d1ba9b134908ab",
  measurementId: "G-WE5H81BG7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);