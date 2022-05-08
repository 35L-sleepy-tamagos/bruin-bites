// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

function StartFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyB0RVYajis4riUkkHIQGKpZKIQD-TE9EBA",
    authDomain: "bruin-bites.firebaseapp.com",
    databaseURL: "https://bruin-bites-default-rtdb.firebaseio.com",
    projectId: "bruin-bites",
    storageBucket: "bruin-bites.appspot.com",
    messagingSenderId: "199820296065",
    appId: "1:199820296065:web:74cf1ee866a69c5dcdb280",
    measurementId: "G-C8PPNWJJDT",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  return getDatabase(app);
}
export default StartFirebase;
