import Mongoose = require("mongoose");
import {DataAccess} from '../../DataAccess';
import { IMenuItemModel } from "../interfaces/IMenuItemModel";
import { IItemCategoryModel } from "../interfaces/IItemCategoryModel";


class MenuItemCategoryModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                categoryId:Number,
                categoryName:String,
                description:String
            }, {collection: 'menucategory'}
        );
    }

    public createModel(): void {
        this.model = Mongoose.model<IItemCategoryModel>("menucategory", this.schema);
    }    
 //add menu item to restaurant
 public addToMenuItemCategory(response:any,jsonObject:any){
    this.model.create(jsonObject,(err) =>{
        if (err){
            response.send("Error while adding to waitlist");
        }
        response.send("Addition successful!!");
    });

}


}
export {MenuItemCategoryModel};