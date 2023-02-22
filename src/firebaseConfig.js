// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbPq_uA3lXjole4YoPBpNNQz5FHd0YD8k",
  authDomain: "linkedin-clone-a077e.firebaseapp.com",
  projectId: "linkedin-clone-a077e",
  storageBucket: "linkedin-clone-a077e.appspot.com",
  messagingSenderId: "24812638518",
  appId: "1:24812638518:web:8eb2ee581841c837a1a397",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
export { auth, app, firestore };
