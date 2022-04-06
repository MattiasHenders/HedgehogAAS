//Imports 
const jwt = require('jsonwebtoken');

//Module Imports
const sendResponse = require('../utils/responseUtils');

//Allowed error codes
const CODES = require("../responseCodes");

//Environment Variables
require('dotenv').config();

/**
 * Authenticates a request by checking the token
 * @param {request} req 
 * @param {response} res 
 * @param {next handler} next 
 * @returns an error if not authenticated
 */
const verifyToken = (req, res, next) => {

    try {

        if (req.cookies.Authorization === undefined) {
            throw new Error("No Authorization Token!")
        }
        let bearerToken = req.cookies.Authorization
        if (!bearerToken.startsWith("Bearer ")) {
            throw new Error("Invalid Bearer Token!")
        }

        let authToken = bearerToken.substring(7, bearerToken.length);

        if (!authToken) {
            return sendResponse(res, CODES.FORBIDDEN, `Forbidden: A token is required for authentication`, undefined);
        }

        const decoded = jwt.verify(authToken, process.env.TOKEN_SECRET);
        req.user = decoded;

    } catch (err) {
        return sendResponse(res, CODES.UNAUTHORIZED, `Unauthorized: ${err.message}`, undefined);
    }

    return next();
};

/**
 * Authenticates a request is an admin by checking the token
 * @param {request} req 
 * @param {response} res 
 * @param {next handler} next 
 * @returns an error if not authenticated admin user
 */
const verifyAdmin = (req, res, next) => {
    //Next check if user that sent the token is admin
    if (req.user.role !== "admin") {
        return sendResponse(res, CODES.UNAUTHORIZED, `Unauthorized: No admin privileges on this account`, undefined);
    }
    return next();
};

module.exports = {
    verify: verifyToken,
    verifyAdmin: verifyAdmin
}