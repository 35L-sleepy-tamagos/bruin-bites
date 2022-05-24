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
import { getStorage, getStream, ref, uploadBytes } from "firebase/storage";
import Review, { app, auth } from "./firebase.js";
import React, { useState, useEffect, useNavigate } from "react";
import { Navigate, useResolvedPath } from "react-router-dom";
import { querystring } from "@firebase/util";
import { getFID } from "web-vitals";

export async function createReview(review) {
  console.log("in create review");
  console.log(review);
  review.id = "id" + new Date().getTime();
  const db = getFirestore();
  try {
    await setDoc(doc(db, "reviews", review.id), {
      id: review.id,
      title: review.title,
      body: review.body,
      rating: review.rating,
      diningHall: review.diningHall,
      user: review.name,
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
    console.log("Dining" + doc.data().diningHall);
    reviews.push(
      new Review(
        doc.data().title,
        doc.data().body,
        doc.data().rating,
        doc.data().user,
        doc.data().createdAt,
        doc.data().diningHall,
      )
    );
  });
  console.log("showing reviews");
  console.log(reviews);
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
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        bio: "",
        dining: [],
        reviews: [],
        image: "",
        favDining1: "",
        favDining2: "",
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
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      bio: "",
      dining: [],
      reviews: [],
      image: "",
      favDining1: "",
      favDining2: "",
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
  var userDetails = {};
  const q = query(userRef, where("uid", "==", uid));
  const qSnapshot = await getDocs(q);
  qSnapshot.forEach((doc) => {
    userDetails = {...doc.data()};
  })
  return userDetails;
}

export async function editBio(uid, newBio) {
  if (!newBio) {
    return;
  }
  const db = getFirestore();
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    bio: newBio,
  });
}

export async function editUserImage(uid, newImg) {
  const db = getFirestore();
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
      img: newImg,
  })
}

export async function editFavDining(uid, newDiningHall, id) {
  if (!newDiningHall) {
    return;
  }
  const db = getFirestore();
  const userRef = doc(db, "users", uid);
  if (id == 1) {
    await updateDoc(userRef, {
      favDining1: newDiningHall,
    })
  }
  else if (id == 2) {
    await updateDoc(userRef, {
      favDining2: newDiningHall,
    })
  }
}