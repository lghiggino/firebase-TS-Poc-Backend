require("dotenv").config()
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "fir-poc-59374.firebaseapp.com",
    projectId: "fir-poc-59374",
    storageBucket: "fir-poc-59374.appspot.com",
    messagingSenderId: "1000302268158",
    appId: "1:1000302268158:web:19c7c5c21e014741ce5faf",
    measurementId: "G-5LJERWFQ7B"
};

export const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();

//Add data
// const docRef = db.collection('users').doc('alovelace');

// docRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// });



