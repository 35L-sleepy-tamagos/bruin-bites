import {
  getDocs,
  query,
  onSnapshot,
  doc,
  setDoc,
  getFirestore,
  Timestamp,
  updateDoc,
  collection,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import Review from "./firebase.js";

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
