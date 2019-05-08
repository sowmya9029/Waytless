import Mongoose = require("mongoose");
import {IItemCategoryModel} from '../interfaces/IItemCategoryModel';
interface IMenuItemModel extends Mongoose.Document {
    itemId: Number,
    restaurantID:Number,
    itemName: String,
    itemCategory: IItemCategoryModel,
    description:String,
    //image:Buffer,
    price :Number,
   // type:String
}
export {IMenuItemModel};