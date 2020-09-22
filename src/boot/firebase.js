// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBvo4vT8fX3FVbpmTz2gundo8XNvvB_n8",
  authDomain: "koa-app-koa.firebaseapp.com",
  databaseURL: "https://koa-app-koa.firebaseio.com",
  projectId: "koa-app-koa",
  storageBucket: "koa-app-koa.appspot.com",
  messagingSenderId: "747073319956",
  appId: "1:747073319956:web:c52cdc51a1aacca9dfe301",
  measurementId: "G-9YSJNDPKYN"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let auth = firebaseApp.auth();
let db = firebaseApp.firestore();
let workshop = db.collection("Workshops");

firebase.analytics();

export { firebaseApp, auth, db, workshop };
