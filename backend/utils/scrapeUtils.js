//Package Imports
const Scraper = require('images-scraper');

//Models for Mongoose
const Hedgehog = require("../models/hedgehog");

//Connect to DB
require("./dbUtils").connect();

//The scrapper that goes through Chromium
const google = new Scraper({
    puppeteer: {
        headless: false,
    },
});

/**
 * Scrapes the web for images
 * @param {string to search for} searchString 
 * @param {number of images to get} amount 
 */
const scrape = async (searchString, amount) => {

    //Results from the Chromium launch
    const results = await google.scrape(searchString, amount);

    //Add each images URL to Mongo unless it already exists
    results.forEach(async (result) => {

        let url = result.url;
        const oldUser = await Hedgehog.findOne({ url });

        if (!oldUser) {
        
            //Attempt to add to Mongo
            try {
                await Hedgehog.create({
                    url: url.toString()
                });

                console.log(`Added ${url}`);
            } catch (e){}
        }

    });
};

module.exports = scrape;