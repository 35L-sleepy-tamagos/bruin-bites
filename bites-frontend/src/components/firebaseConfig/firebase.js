import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: "bruin-bites.firebaseapp.com",
  // databaseURL: "https://bruin-bites-default-rtdb.firebaseio.com",
  // projectId: "bruin-bites",
  // storageBucket: "bruin-bites.appspot.com",
  // messagingSenderId: "199820296065",
  // appId: "1:199820296065:web:74cf1ee866a69c5dcdb280",
  // measurementId: "G-C8PPNWJJDT",
  /* demo info */
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "bites-backup.firebaseapp.com",
  projectId: "bites-backup",
  storageBucket: "bites-backup.appspot.com",
  messagingSenderId: "145904300422",
  appId: "1:145904300422:web:0be6081aaa70a513593c07",
  measurementId: "G-J86SWRY9E1"
};

/* firebase initialization inspired from https://blog.logrocket.com/user-authentication-firebase-react-apps/ */

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
