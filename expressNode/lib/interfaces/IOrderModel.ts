import Mongoose = require("mongoose");
import {MenuItemModel} from '../models/MenuItemModel'

interface IOrderModel extends Mongoose.Document {
    orderId: String,
    menuItemId: Number,
    quantity: Number,
    orderTime: Date,
    customerId : Number,
    restaurantID : Number
}
export {IOrderModel};