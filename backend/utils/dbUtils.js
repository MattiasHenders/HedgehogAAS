//Imports
const mongoose = require('mongoose');

//Environment Variables
require('dotenv').config();

/**
 * Connects to the MongoDB
 */
const connectToMongo = async () => {

    console.log("Connecting...");

    //Connect attempt
    await mongoose.connect(process.env.MONGO_URL + process.env.MONGO_DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Successfully connected to database");
      })
      .catch((error) => {
        console.log("Database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });
}

module.exports = {
    connect: connectToMongo
}