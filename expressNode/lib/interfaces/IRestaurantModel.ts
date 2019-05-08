import Mongoose = require("mongoose");
import {WaitlistEntryModel} from '../models/WaitlistEntryModel';
interface IRestaurantModel extends Mongoose.Document {
    restaurantId: Number,
    name: String,
    address: String,
    phoneNumber: Number,
    rating:Number,
    waitlingList: [WaitlistEntryModel]
}
export {IRestaurantModel};