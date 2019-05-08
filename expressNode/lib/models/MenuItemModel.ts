import Mongoose = require("mongoose");
import {DataAccess} from '../../DataAccess';
import { IMenuItemModel } from "../interfaces/IMenuItemModel";
import { MenuItemCategoryModel } from "./MenuItemCategoryModel";
let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class MenuItemModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }
  
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                restaurantId:Number,
                itemId: Number,
                itemName: String,
                itemCategory: [MenuItemCategoryModel],
                description:String,
                image: { data: Buffer, contentType: String },
                price :Number
            }, {collection: 'lists'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IMenuItemModel>("Menu", this.schema);
    }
   //retrieve menu based on menu category filter will have restaurantID and category
    public retrieveMenuBasedOnCategory(response:any,filter:Object): any {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }
    //retrieve all  menu of a restaurant filter will only have restaurantId
    public retrieveAllMenu(response:any,filter:Object): any {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

    //updateMenuItem based on itemId


    //deleteMenuItem based on itemId
}
export {MenuItemModel};