import Mongoose = require("mongoose");

interface IRestaurantUserModel extends Mongoose.Document {
    restaurantId: Number,
    name: String,
    address: String,
    phoneNumber: Number,
  
    
}
export {IRestaurantUserModel};