const express = require('express');
const router = express.Router();
const { auth, firestore } = require('../Models/FirebaseConfig');
const { signInWithEmailAndPassword } = require('firebase/auth');
const { collection, query, where, getDocs } = require('firebase/firestore');

router.post('/', async (req, res) => {
    const { userEmail, password } = req.body;
    console.log(userEmail, password);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, userEmail, password);
        const user = userCredential.user;

        // Fetch additional user details from Firestore
        const usersCollection = collection(firestore, 'Users');
        const q = query(usersCollection, where('authUid', '==', user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return res.status(404).json({ message: 'User details not found' });
        }

        let userData;
        querySnapshot.forEach((doc) => {
            userData = { id: doc.id, ...doc.data() };
        });

        res.json({
            message: 'Login Successful',
            userData: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                ...userData 
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(401).json({ message: 'Login Failed', error: error.message });
    }
});

module.exports = router;
