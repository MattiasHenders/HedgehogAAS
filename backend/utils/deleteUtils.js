//Models for Mongoose
const Hedgehog = require("../models/hedgehog");

/**
 * Removes a hedgehog from mongo
 * @param {imgID of hedgehog to delete} imgID 
 */
 const deleteOneHedgeHog = (imgID) => {

    return new Promise( async (res, rej) => {
    
        //Remove the image
        let resp = undefined;
        try {
            resp = await Hedgehog.deleteOne({ "_id": {"$eq": imgID}});
        } catch (e) {
            resp = undefined;
        }

        res(resp);
    });
}

module.exports = {
    deleteOne: deleteOneHedgeHog,
}