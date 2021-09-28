// Import the functions you need from the SDKs you need
import * as Firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnl9uBvOzXP3RHjoJ9NIX_ZDHpYqiRgjM",
  authDomain: "todo-d13e8.firebaseapp.com",
  databaseURL: "https://todo-d13e8-default-rtdb.firebaseio.com",
  projectId: "todo-d13e8",
  storageBucket: "todo-d13e8.appspot.com",
  messagingSenderId: "308049272624",
  appId: "1:308049272624:web:cc1685c246adf1e80132f5"
};

// Initialize Firebase
const app = Firebase.initializeApp(firebaseConfig);
export default app;