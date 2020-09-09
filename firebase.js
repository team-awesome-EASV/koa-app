import firebase from 'firebase';

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
firebase.initializeApp( firebaseConfig );
firebase.analytics();

export const db = firebase.firestore();
export const workshop = db.collection( 'Workshops' );