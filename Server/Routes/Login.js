// Routes/Login.js
const express = require('express');
const router = express.Router();
const { firestore } = require('../Models/FirebaseConfig');
const { collection, query, where, getDocs } = require('firebase/firestore');

router.post('/', async (req, res) => {
  const { userEmail, password } = req.body;
  console.log(userEmail, password);

  try {
    const usersCollection = collection(firestore, 'Users');
    const q = query(usersCollection, where('userEmail', '==', userEmail), where('userPassword', '==', password));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(401).json({ message: 'Login Failed' });
    }

    let userData;
    querySnapshot.forEach((doc) => {
      userData = { id: doc.id, ...doc.data() };
    });

    res.json({ message: 'Login Successful', userData });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error during login');
  }
});

module.exports = router;
