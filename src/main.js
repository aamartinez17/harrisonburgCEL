import './assets/_index.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwt85q2gRf9dDUtmOxhPcFmRBRGyl9Wxo",
  authDomain: "harrisonburgcel.firebaseapp.com",
  projectId: "harrisonburgcel",
  storageBucket: "harrisonburgcel.firebasestorage.app",
  messagingSenderId: "278476060561",
  appId: "1:278476060561:web:668d74676508fd1e588c30",
  measurementId: "G-97DNRVDQFQ"
};

// Initialize Firebase
const config = initializeApp(firebaseConfig);

const app = createApp(App);

const analytics = getAnalytics(config);

// const app = createApp(App);

app.use(router);

app.mount('#app');
