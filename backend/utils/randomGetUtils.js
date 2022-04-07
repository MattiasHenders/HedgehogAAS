//Models for Mongoose
const Hedgehog = require("../models/hedgehog");

/**
 * Gets a single random hedgehog from the database
 */
const getOneRandomHedgeHog = () => {

    return new Promise((res, rej) => {

        // Find a single random document
        Hedgehog.findOneRandom((err, result) => {

            if (!err) {

                //Clean up result JSON
                result.__v = undefined;
                result.count = 1;

                res(result); // 1 element
            } else {
                rej(err);
            }
        });
    });
}

/**
 * Gets a number of random hedgehogs from the database
 * @param {number of hedgehogs to get} number 
 */
 const getManyRandomHedgeHog = (number) => {

    return new Promise((res, rej) => {
    
        // Find a single random document
        Hedgehog.findRandom({}, {}, {limit: number}, (err, results) => {

            if (!err) {

                //Clean up result JSON
                results.forEach(element => {
                    element.__v = undefined;
                });

                let result = results;
                result.__v = undefined;
                result.count = number;

                res(result); //many elements
            } else {
                rej(err);
            }
        });
    });
}

module.exports = {
    getOneRandom: getOneRandomHedgeHog,
    getManyRandom: getManyRandomHedgeHog
}