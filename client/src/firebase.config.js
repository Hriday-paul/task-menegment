// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfvIDrQPSQK4FIf5-VVyJWwrcKgB248wM",
  authDomain: "context-project-5b603.firebaseapp.com",
  projectId: "context-project-5b603",
  storageBucket: "context-project-5b603.appspot.com",
  messagingSenderId: "743367235403",
  appId: "1:743367235403:web:8b1ef96fdf9952e4d0face"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;