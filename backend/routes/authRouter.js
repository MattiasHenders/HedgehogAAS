//Package Imports
const express = require('express');
const router = express.Router();

//Module Imports
const sendResponse = require('../utils/responseUtils');
const auth = require('../utils/authUtils').auth;

//Allowed error codes
const CODES = require("../utils/responseCodes");

//Environment Variables
require('dotenv').config();

/**
 * POST request for login to account
 * @param {requests} req
 * @param {response} res
 */
router.post(`/login`, async (req, res) => {


});

/**
 * POST request for sign up
 * @param {requests} req
 * @param {response} res
 */
router.post(`/signup`, async (req, res) => {


});

module.exports = router;