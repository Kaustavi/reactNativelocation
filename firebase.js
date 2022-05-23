// Import the functions you need from the SDKs you need
import firebase from 'firebase';
import {GeoFire} from 'geofire';
import '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD4l-dwLNzjGJzUtJUzcjfTbMOjmKQyf-M',
  authDomain: 'react-firecms.firebaseapp.com',
  projectId: 'react-firecms',
  storageBucket: 'react-firecms.appspot.com',
  messagingSenderId: '261115051025',
  appId: '1:261115051025:web:584ed013d89330a54485b0',
  measurementId: 'G-HM0ZH9PBB4',
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseRef = firebase.database().ref('geoLocation');
export const geoFire = new GeoFire(firebaseRef);
