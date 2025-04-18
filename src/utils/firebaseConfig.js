// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP0q_x5z0avL21W6Uy_tZcSRbvWYsJ2qA",
  authDomain: "skeds-planner.firebaseapp.com",
  projectId: "skeds-planner",
  storageBucket: "skeds-planner.firebasestorage.app",
  messagingSenderId: "984303138314",
  appId: "1:984303138314:web:69e7687a3065f309c8d1f3"
};
const app = initializeApp(firebaseConfig)

// Initialize Firebase
export default app;