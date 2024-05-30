const express = require('express')
const router = express.Router();

router.use('/', (req,res) => {
    const datas = req.body;
    console.log("Data are : ",datas)
    return res.status(200).json({msg:"Data Recieved" , data:datas})
})

module.exports = router