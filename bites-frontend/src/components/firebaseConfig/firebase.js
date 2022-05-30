import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

/* firebase initialization inspired from https://blog.logrocket.com/user-authentication-firebase-react-apps/ */

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);