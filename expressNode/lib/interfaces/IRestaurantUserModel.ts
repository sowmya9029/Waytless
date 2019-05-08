import Mongoose = require("mongoose");

interface IRestaurantUserModel extends Mongoose.Document {
    restaurantID: Number,
    name: String,
    address: String,
    phoneNumber: Number,
  
    
}
export {IRestaurantUserModel};