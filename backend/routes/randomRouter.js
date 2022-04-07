//Package Imports
const express = require('express');
const router = express.Router();

//Module Imports
const sendResponse = require('../utils/responseUtils');
const randomImage = require('../utils/randomGetUtils');

//Allowed error codes
const CODES = require("../utils/responseCodes");

//Environment Variables
require('dotenv').config();

//Global variables
const MAX_IMAGES = 100;

/**
 * GET request for getting HTTP code hedgehogs
 * @param {requests} req
 * @param {response} res
 */
router.get(`/`, (req, res) => {

    //Amount of images
    let numImages = req.query.count;

    //Check if just getting a single image
    if (numImages === null || numImages === undefined || numImages === 0) {
        
        getSingleImage(res);
    } else if (numImages > MAX_IMAGES) {

        return sendResponse(res, CODES.REQ_HEADER_BIG, `Cannot get that many hedgehogs! Maximum is ${MAX_IMAGES} hedgehogs.`)    
    } else {

        getMultiImage(res, numImages);
    }
});

/**
 * Get a single random hedgehog
 * @param {resposne} res 
 */
 const getSingleImage = async (res) => {

    //Get single Promise call
    randomImage.getOneRandom()
    .then((results) => {

        //If all good
        return sendResponse(res, CODES.OK, `Got a hedgehog!`, results);
    })
    .catch((err) => {

        //If an error
        return sendResponse(res, CODES.SERVER_ERROR, `Server error!`, err);
    });
}

/**
 * Get mutliple random hedgehogs
 * @param {resposne} res 
 * @param {number of images to get} numImages 
 */
const getMultiImage = (res, numImages) => {

    //Get many Promise call
    randomImage.getManyRandom(numImages)
    .then((results) => {

        //If all good
        return sendResponse(res, CODES.OK, `Got hedgehogs!`, results);
    })
    .catch((err) => {

        //If an error
        return sendResponse(res, CODES.SERVER_ERROR, `Server error!`, err);
    });
}

module.exports = router;