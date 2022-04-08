//Package Imports
const express = require('express');
const router = express.Router();

//Module Imports
const sendResponse = require('../utils/responseUtils');

//Allowed error codes
const CODES = require("../utils/responseCodes");

//Models for Mongoose
const Hedgehog = require("../models/hedgehog");

//Environment Variables
require('dotenv').config();

/**
 * DELETE request for removing hedgehog from mongo
 * @param {requests} req
 * @param {response} res
 */
router.delete(`/`, async (req, res) => {

    //ID of the image
    let imgID = req.body.id;

    //Remove the image
    let resp = undefined;
    try {
        resp = await Hedgehog.deleteOne({ "_id": {"$eq": imgID}});
    } catch (e) {
        resp = undefined;
    }

    //Check for removal success
    if (!resp || !resp.deletedCount || resp.deletedCount !== 1) {

        return sendResponse(res, CODES.BAD_REQUEST, `Did not find image to delete!`, resp);
    } else {

        return sendResponse(res, CODES.OK, `Deleted hedgehog`, resp);
    }
});


module.exports = router;