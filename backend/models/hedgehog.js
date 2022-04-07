//Imports
const mongoose = require("mongoose");
let random = require('mongoose-simple-random');

const hedgehogSchema = new mongoose.Schema({
  url: { type: String, unique: true }
});

//Add plugins
hedgehogSchema.plugin(random);

module.exports = mongoose.model("hedgehog", hedgehogSchema);