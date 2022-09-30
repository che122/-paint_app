// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "@firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9Fn00e7yx7emzDzfD5hd4pahZOJ5lfGI",
  authDomain: "paint-project-361412.firebaseapp.com",
  projectId: "paint-project-361412",
  storageBucket: "paint-project-361412.appspot.com",
  messagingSenderId: "751432987815",
  appId: "1:751432987815:web:bceb330e0e88355e739782",
  measurementId: "G-CPGXE58B6Q"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0 ){
    app=firebase.initializeApp(firebaseConfig);
}else{
    app=firebase.app()
}
//const auth=firebase.auth()
const auth=firebase.auth()
const db=getFirestore();
const storage = getStorage();
export{auth, db, storage};