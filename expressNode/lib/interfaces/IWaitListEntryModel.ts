import Mongoose = require("mongoose");

interface IWaitListEntryModel extends Mongoose.Document {
        customerName: String,
        restaurantID: Number,
        groupSize: Number,
        joinTime: Date,
        email : String,
        phone : String,
        notified: Boolean,
        confirmed:Boolean
}
export {IWaitListEntryModel};