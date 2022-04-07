//Package Imports
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

//Module Imports
const sendResponse = require('../utils/responseUtils');

//Allowed error codes
const CODES = require("../utils/responseCodes");

//Environment Variables
require('dotenv').config();

/**
 * GET request for getting HTTP code hedgehogs
 * @param {requests} req
 * @param {response} res
 */
router.get(`/`, (req, res) => {

    //Get the code number
    let requestCode = req.query.code;

    //Check if rawCode exists and is an int
    if (!requestCode || !isNaN) {
        return sendResponse(res, CODES.BAD_REQUEST, `HTTP Code doesn't exist or is not a number.`)
    }

    //Check and send the user a hedgehog if found
    requestCodeCheck(res, requestCode);
});

/**
 * Check the error code folder exists
 * @param {code from request} code 
 * @param {resposne} res 
 */
const requestCodeCheck = (res, code) => {

    //Get the base 100 number
    let baseCode = Math.floor(code/100) * 100;

    //Get directory to check
    const dir = path.join(__dirname, '..', `./photos/${baseCode}s/${code}`);

    //Check if directory exists
    fs.access(dir, (err) => {
        
        //If error, then path doesnt exist
        if(err){

            //Not a valid path, so not a valid code
            return sendResponse(res, CODES.BAD_REQUEST, `HTTP Code ${code} is not a valid code.`)

        } else {

            //Send the user a hedgehog!
            sendCodeImage(res, dir, code);
        }
    });
}

/**
 * Send an image
 * @param {processed code from request} code 
 */
const sendCodeImage = (res, dir, code) => {

    //Read all the files in the folder
    fs.readdir(dir, (err, files) => {

        //If folder is corrupted or deleted
        if (err || files.length === 0) {

            return sendResponse(res, CODES.NOT_IMPLEMENTED, `Server seems to be missing that code. Try again or use a different code.`)
        }

        //Randomly select a file
        let fileIndex = Math.floor(Math.random() * files.length);
        let filePath = path.join(dir, files[fileIndex]);

        //Set up resonse object
        let responseJSON = {
            codeRequest: code,
            imageURI: filePath
        }

        //Return filepath to user in JSON
        return sendResponse(res, CODES.OK, `Found a hedgehog for code ${code}}.`, responseJSON)
        
      });
}

module.exports = router;