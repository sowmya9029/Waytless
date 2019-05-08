import Mongoose = require("mongoose");
import {IItemCategoryModel} from '../interfaces/IItemCategoryModel';
interface IMenuItemModel extends Mongoose.Document {
    itemId: Number,
    restaurantID:Number,
    itemName: String,
   // price :Number,
    description:String,
    //image:Buffer,
    itemCategory: Object,
    price :Number,

   // type:String
}
export {IMenuItemModel};