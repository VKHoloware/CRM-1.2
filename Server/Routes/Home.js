const { Router } = require('express');
const express = require('express')
const router = express.Router();

router.get('/',(req,res) => {
    res.send("Hello world! Welcome AK")
})

module.exports = router;