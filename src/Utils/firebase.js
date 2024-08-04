// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHhQDCE5BzFZQJe6lHcKNuFeftsSycIeI",
  authDomain: "watchgpt-9f8ba.firebaseapp.com",
  projectId: "watchgpt-9f8ba",
  storageBucket: "watchgpt-9f8ba.appspot.com",
  messagingSenderId: "448540036571",
  appId: "1:448540036571:web:0dc3f0fce4931d6281ebfe",
  measurementId: "G-D8S8TVCSRH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
