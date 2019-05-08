import Mongoose = require("mongoose");
import {IItemCategoryModel} from '../interfaces/IItemCategoryModel';
interface IMenuItemModel extends Mongoose.Document {
    itemId: Number,
    restaurantId:Number,
    itemName: String,
    itemCategory: IItemCategoryModel,
    description:String,
    image:Buffer,
    price :Number
}
export {IMenuItemModel};