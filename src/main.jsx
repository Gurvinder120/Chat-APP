import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD_7s_a7eh180jPvdiuv3-jRel66nbo1YI",
  authDomain: "chat-app-6c1b2.firebaseapp.com",
  databaseURL: "https://chat-app-6c1b2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app-6c1b2",
  storageBucket: "chat-app-6c1b2.appspot.com",
  messagingSenderId: "932662806577",
  appId: "1:932662806577:web:0200a828674e896c8b2d10",
  measurementId: "G-D5TYG2SLD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
