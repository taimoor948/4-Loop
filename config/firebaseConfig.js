// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "loop-62e76.firebaseapp.com",
  projectId: "loop-62e76",
  storageBucket: "loop-62e76.appspot.com",
  messagingSenderId: "885136574112",
  appId: "1:885136574112:web:36870eb3935c4475fd2bc5",
  measurementId: "G-CLGM49756Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

let analytics;
if (typeof window !== 'undefined') {
  // Only initialize analytics in the client-side
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };
