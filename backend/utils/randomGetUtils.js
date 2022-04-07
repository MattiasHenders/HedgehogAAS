//Models for Mongoose
const Hedgehog = require("./models/hedgehog");

/**
 * Gets a single random hedgehog from the database
 */
const getOneRandomHedgeHog = () => {

    // Find a single random document
    Hedgehog.findOneRandom((err, result) => {

        if (!err) {
            console.log(result); // 1 element
        }
    });
}

/**
 * Gets a number of random hedgehogs from the database
 * @param {number of hedgehogs to get} number 
 */
 const getManyRandomHedgeHog = (number) => {

    // Find a single random document
    Hedgehog.findRandom({}, {}, {limit: number}, (err, results) => {

        if (!err) {
            console.log(results); // array of elements
        }
    });
}

module.exports = {
    getOneRandom: getOneRandomHedgeHog,
    getManyRandom: getManyRandomHedgeHog
}