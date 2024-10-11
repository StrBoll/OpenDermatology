// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4vXALSPov1CpnQQzrMawkeBLInsWA5is",
  authDomain: "openderm-50769.firebaseapp.com",
  projectId: "openderm-50769",
  storageBucket: "openderm-50769.appspot.com",
  messagingSenderId: "354616642552",
  appId: "1:354616642552:web:6dfa764f9a25439a24e40d",
  measurementId: "G-08KG7K77T6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);