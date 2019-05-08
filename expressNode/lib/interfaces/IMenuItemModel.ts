import Mongoose = require("mongoose");
import {IItemCategoryModel} from '../interfaces/IItemCategoryModel';
interface IMenuItemModel extends Mongoose.Document {
    itemID: Number,
    itemName: String,
    price :Number,
    description:String,
    restaurantID:Number,
    type: String
}
export {IMenuItemModel};