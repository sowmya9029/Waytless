import Mongoose = require("mongoose");
import {WaitlistEntryModel} from '../models/WaitlistEntryModel';
interface IRestaurantModel extends Mongoose.Document {
    restaurantID:Number,
                name:String,
                address:{street: String, number: String, zip: String, city: String},
                phoneNumber: {type:Number, required: true},
                rating:Number,
                email:String,
                cuisine:String,
                reviews:Number,
                booked:Number,
                url:String
}
export {IRestaurantModel};