// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import store from "../store/index";

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
let workshops = db.collection("Workshops");
let users = db.collection("Users");
let groups = db.collection("Groups");

firebase.analytics();

const ensureAuthIsInitialized = async store => {
  if (store.state.auth.isReady) return true;
  // Create the observer only once on init
  return new Promise((resolve, reject) => {
    // Use a promise to make sure that the router will eventually show the route after the auth is initialized.
    const unsubscribe = auth.onAuthStateChanged(
      user => {
        resolve();
        unsubscribe();
      },
      () => {
        reject(
          new Error(
            "Looks like there is a problem with the firebase service. Please try again later"
          )
        );
      }
    );
  });
};

const isAuthenticated = store => {
  return store.state.auth.isAuthenticated;
};

auth.onAuthStateChanged(
  user => {
    const handleAuthChange = async (store, user) => {
      const initialAuthState = store => {
        return store.state.auth.isAuthenticated;
      };
      // Save to the store
      store.commit("auth/setAuthState", {
        isAuthenticated: user !== null,
        isReady: true
      });

      if (user) store.dispatch("auth/getUserData", auth.currentUser.uid);

      // If the user loses authentication route
      // them to the login page
      if (!user && initialAuthState) {
        store.dispatch("auth/routeUserToAuth");
        store.commit("auth/userStatus");
      }
    };

    handleAuthChange(store, user);
  },
  error => {
    console.error(error);
  }
);

export {
  firebaseApp,
  auth,
  db,
  workshops,
  users,
  firebaseConfig,
  groups,
  ensureAuthIsInitialized,
  isAuthenticated
};
