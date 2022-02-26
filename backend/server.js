
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./models/User');
const dotenv = require('dotenv');
const colors = require('colors');

// DOTENV Config
dotenv.config({path: './.env'});

// Express Config
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Sec-Fetch-Mode");
    next();
  });


// Mongoose Config
const connectDB = require('./config/db');
connectDB();

 

app.use('/api', require('./routes/index'));
app.get('/', (req, res) => {
    res.send("Login API running");
})

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`\nServer port: ${PORT}`.bold.white));
