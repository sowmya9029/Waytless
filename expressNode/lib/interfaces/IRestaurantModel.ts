import Mongoose = require("mongoose");
import {IWaitListEntryModel} from './../models/IWaitListEntryModel';
interface IRestaurantModel extends Mongoose.Document {
    restaurantId: Number,
    name: String,
    address: String,
    phoneNumber: Number,
    rating:Number,
    image:Buffer
    waitlingList: [IWaitListEntryModel]
}
export {IRestaurantModel};