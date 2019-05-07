import Mongoose = require("mongoose");
import {waitlistEntryModel} from './../models/waitlistEntryModel';
interface IRestaurantModel extends Mongoose.Document {
    restaurantId: Number,
    name: String,
    address: String,
    phoneNumber: Number,
    rating:Number,
    waitlingList: [waitlistEntryModel]
}
export {IRestaurantModel};