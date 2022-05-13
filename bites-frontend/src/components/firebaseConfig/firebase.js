// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

export default class Review {
  constructor(title, body, rating, user, createdAt) {
    this.title = title;
    this.body = body;
    this.rating = rating;
    this.user = user;
    this.createdAt = createdAt;
  }
}
export function InitFirebase() {
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
  if (getApps().length === 0) {
    initializeApp(firebaseConfig);
  }
}
