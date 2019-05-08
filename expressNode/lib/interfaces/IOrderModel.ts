import Mongoose = require("mongoose");
import {MenuItemModel} from '../models/MenuItemModel'

interface IOrderModel extends Mongoose.Document {
    menuItem: MenuItemModel,
    quantity: Number,
    orderTime: Date,
    customerId : Number,
    restaurantID : Number
}
export {IOrderModel};