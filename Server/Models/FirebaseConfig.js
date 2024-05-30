// Models/FirebaseConfig.js
const { initializeApp } = require('firebase/app');
const { getDatabase } = require('firebase/database');
const { getStorage } = require('firebase/storage');
const { getFirestore } = require('firebase/firestore');
//const { getAnalytics } = require("firebase/analytics")

const firebaseConfig = {
    apiKey: "AIzaSyBnlTgVCO58kMt7hq5Z8WU7MjrTnhk-uzM",
    authDomain: "project-crm-65cca.firebaseapp.com",
    projectId: "project-crm-65cca",
    storageBucket: "project-crm-65cca.appspot.com",
    messagingSenderId: "1051344936870",
    appId: "1:1051344936870:web:796222c4f36388a28f7967",
    measurementId: "G-FW2XQ1B4VX"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const firestore = getFirestore(app);
//const analytics = getAnalytics(app);

module.exports = { database, storage, firestore };
