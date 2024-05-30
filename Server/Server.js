const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const Data = require('./Routes/Data.js')
const Model = require('./Models/FirebaseConfig')
const Home = require('./Routes/Home')
const SignUp = require('./Routes/SignUp')
const Login = require('./Routes/Login')

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/',Home);
app.use('/signup',SignUp)
app.use('/login',Login)
app.use('/data',Data)

const PORT = 7000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})