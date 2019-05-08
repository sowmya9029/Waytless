import Mongoose = require("mongoose");
import {DataAccess} from '../../DataAccess';
import { IMenuItemModel } from "../interfaces/IMenuItemModel";
import { MenuItemCategoryModel } from "./MenuItemCategoryModel";
let mongooseConnection = DataAccess.connect;
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
                itemId: Number,
                itemName: String,
                price: Number,
                description:String,
                restaurantId:Number,
                type: String
            }, {collection: 'menuitems'}
        );
    }

    public createModel(): void {
        this.model = Mongoose.model<IMenuItemModel>("menuitems", this.schema);
    }
   //retrieve menu based on menu category filter will have restaurantID and category
    public retrieveMenuBasedOnCategory(response:any, filter:Object): any {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }
    //retrieve all menu of a restaurant filter will only have restaurantId
    public retrieveMenu(response:any, filter:Object): any {
        var x = filter["restaurantID"];
        console.log('vaa ' + x);

        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    //updateMenuItem based on itemId


    //deleteMenuItem based on itemId
}
export {MenuItemModel};