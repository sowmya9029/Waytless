import Mongoose = require("mongoose");

interface IWaitListEntryModel extends Mongoose.Document {
        queueID: Number,
        customerName: String,
        restaurantID: Number,
        groupSize: Number,
        joinTime: Date,
        quotedtime: Date,
        email : String,
        phone : String,
        notified: Boolean,
        confirmed:Boolean,
        completed: Boolean
}
export {IWaitListEntryModel};