import {
  getDocs,
  query,
  onSnapshot,
  doc,
  setDoc,
  addDoc,
  getFirestore,
  Timestamp,
  updateDoc,
  collection,
  where,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Review, { app, auth } from "./firebase.js";
import React, { useState, useEffect, useNavigate } from "react";
import { Navigate, useResolvedPath } from "react-router-dom";
import { querystring } from "@firebase/util";
import { getFID } from "web-vitals";

export async function createReview(review) {
  console.log(review);
  review.id = "id" + new Date().getTime();
  const db = getFirestore();
  try {
    await setDoc(doc(db, "reviews", review.id), {
      id: review.id,
      title: review.title,
      body: review.body,
      rating: review.rating,
      user: review.user,
      createdAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function getReviews() {
  const db = getFirestore();
  const reviews = [];
  const querySnapshot = await getDocs(collection(db, "reviews"));
  querySnapshot.forEach((doc) => {
    reviews.push(
      new Review(
        doc.data().title,
        doc.data().body,
        doc.data().rating,
        doc.data().user,
        doc.data().createdAt
      )
    );
  });
  return reviews;
}

/* login/out functions inspired by https://blog.logrocket.com/user-authentication-firebase-react-apps/ */

export async function googleSignIn() {
  const googleProvider = new GoogleAuthProvider();
  const db = getFirestore();
  try {
    const account = await signInWithPopup(auth, googleProvider);
    const user = account.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

export async function emailSignIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  }
  catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export async function emailRegister(name, email, password) {
  const db = getFirestore();
  try {
    const account = await createUserWithEmailAndPassword(auth, email, password);
    const user = account.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  }
  catch (err) {
    console.error(err);
    alert(err.message);
  }
}

export function logout() {
  console.log("signing out");
  signOut(auth);
}

export async function getUsers(uid) {
  const db = getFirestore();
  const userRef = collection(db, "users");
  const userDetails = [];
  const q = query(userRef, where("uid", "==", uid));
  const qSnapshot = await getDocs(q);
  qSnapshot.forEach((doc) => {
    userDetails.push(
      doc.data().name, 
      doc.data().email,
      doc.data().uid,);
  })
  return userDetails;
}