//Package Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

//Module Imports
const CODES = require("./utils/responseCodes");
const sendResponse = require('./utils/responseUtils');

//Connect to DB
require("./utils/dbUtils").connect();
    
//Router Imports
const authRouter = require('./routes/authRouter');
const codesRouter = require('./routes/codesRouter');
const randomRouter = require('./routes/randomRouter');
const deleteRouter = require('./routes/deleteRouter');

//Environment Variables
require('dotenv').config();

//Global Variables
const port = process.env.PORT || 5000;
const CURRENT_VERSION = 1;
const ROOT_PATH = `/api/v${CURRENT_VERSION}`;

//Server Setup
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Server running on given port or default
 */
app.listen(port, () => {

    console.log(`Server running on port ${port}`);
});

/**
 * Handles all requests through the server
 * Sets the correct fields for JSON return
 */
app.all('*', (req, res, next) => {

    //Log all requests
    console.log(req.url, "called at", new Date().toLocaleString());

    //Set header fields
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    //Pass the request to the next handler
    next();
});

//Authorization routes
app.use(`${ROOT_PATH}/auth`, authRouter);
app.use(`${ROOT_PATH}/codes`, codesRouter);
app.use(`${ROOT_PATH}/random`, randomRouter);
app.use(`${ROOT_PATH}/delete`, deleteRouter);

//404 Handler
app.get('*', (req, res) => {
    return sendResponse(res, CODES.NOT_FOUND, `Route Not Found!`)
});

// Close DB connection when server shuts down
process.on('SIGINT', () => {

    mongoose.connection.close( () => {

        console.log('Mongoose disconnected on app termination');
        process.exit(0);
    });
});
