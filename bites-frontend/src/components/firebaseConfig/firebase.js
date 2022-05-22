// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default class Review {
  constructor(title, body, rating, user, createdAt) {
    this.title = title;
    this.body = body;
    this.rating = rating;
    this.user = user;
    this.createdAt = createdAt;
  }
}

// export function InitFirebase() {
//   const firebaseConfig = {
//     apiKey: "AIzaSyB0RVYajis4riUkkHIQGKpZKIQD-TE9EBA",
//     authDomain: "bruin-bites.firebaseapp.com",
//     databaseURL: "https://bruin-bites-default-rtdb.firebaseio.com",
//     projectId: "bruin-bites",
//     storageBucket: "bruin-bites.appspot.com",
//     messagingSenderId: "199820296065",
//     appId: "1:199820296065:web:74cf1ee866a69c5dcdb280",
//     measurementId: "G-C8PPNWJJDT",
//   };
//   //Initialize Firebase
//   if (getApps().length === 0) {
//     initializeApp(firebaseConfig);
//   }
// }

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  app,
  auth,
}



