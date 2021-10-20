//aquí va a estar la instalación de la firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNwNZD64YDhT_O-tV3h8RnIpAcXkC1ZmY",
  authDomain: "svb-web-crud-6b3df.firebaseapp.com",
  projectId: "svb-web-crud-6b3df",
  storageBucket: "svb-web-crud-6b3df.appspot.com",
  messagingSenderId: "796563258317",
  appId: "1:796563258317:web:9d1ea5fae3dad18dcfe284"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//para usar la firebase en otros scripts
export default app;
