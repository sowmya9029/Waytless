import Mongoose = require("mongoose");
interface IItemCategoryModel extends Mongoose.Document {
    categoryId:Number,
    categoryName:String,
    description:String
}
export {IItemCategoryModel};