import Mongoose = require("mongoose");
import {DataAccess} from '../../DataAccess';
import { IMenuItemModel } from "../interfaces/IMenuItemModel";
import { IItemCategoryModel } from "interfaces/IItemCategoryModel";
let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

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
            }, {collection: 'lists'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IItemCategoryModel>("Menu", this.schema);
    }    

   //delete category
    public deleteCategory(response:any,filter:Object): any {
        var query = this.model.findOneAndRemove(filter).then(response => {
            console.log(response)
          })
          .catch(err => {
            console.error(err)
          });
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

}
export {MenuItemCategoryModel};