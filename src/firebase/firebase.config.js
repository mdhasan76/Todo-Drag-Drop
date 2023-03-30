// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9vuFXIMS_9LVFMtQYnS6HW2jmsRAPt1Q",
  authDomain: "todo-draganddrop.firebaseapp.com",
  projectId: "todo-draganddrop",
  storageBucket: "todo-draganddrop.appspot.com",
  messagingSenderId: "523313835414",
  appId: "1:523313835414:web:7d2381a33f7469f6c8c1b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;