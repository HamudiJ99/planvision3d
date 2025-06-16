// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8iHt199Jmx9YMvlK1n0UkM4orMqpl-Bw",
  authDomain: "planvision3dpid.firebaseapp.com",
  projectId: "planvision3dpid",
  storageBucket: "planvision3dpid.firebasestorage.app",
  messagingSenderId: "262545087894",
  appId: "1:262545087894:web:91584781897e6821d351b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);