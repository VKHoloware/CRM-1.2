// Routes/SignUp.js
const express = require('express');
const { firestore, storage } = require('../Models/FirebaseConfig');
const multer = require('multer');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { collection, addDoc } = require('firebase/firestore'); 

const router = express.Router();
const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage });

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { userName, userEmail, userPassword, userMobile } = req.body;
        const file = req.file;

        console.log(userName, userEmail, userPassword, userMobile);
        console.log(file);
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        const storageRef = ref(storage, `images/${Date.now()}_${file.originalname}`);
        const snapshot = await uploadBytes(storageRef, file.buffer, { contentType: file.mimetype });
        const downloadURL = await getDownloadURL(snapshot.ref);

        const docRef = await addDoc(collection(firestore, 'Users'), {
            userName,
            userEmail,
            userPassword,
            userMobile,
            signImage: downloadURL 
        });

        res.json({ message: 'User data stored successfully', docId: docRef.id });
    } catch (error) {
        console.error('Error storing user data:', error);
        res.status(500).send('Error storing user data');
    }
});

module.exports = router;
