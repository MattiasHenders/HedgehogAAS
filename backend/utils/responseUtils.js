/**
 * Sends the response to the client
 * @param {response object} res 
 * @param {response code} status 
 * @param {message going with response code} message 
 * @param {date to add (optional)} data 
 */
 const sendResponse = (res, status, message, data) => {

    //Create return object
    let rtnJSON = {
        status: status,
        message: message,
        data: data
    };

    res.status(rtnJSON.status).send(rtnJSON);
}

module.exports = sendResponse;