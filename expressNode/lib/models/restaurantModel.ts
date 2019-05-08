import Mongoose = require("mongoose");
import {WaitlistEntryModel} from './WaitlistEntryModel';
import { IRestaurantModel } from "../interfaces/IRestaurantModel";
import {MenuItemModel} from "./MenuItemModel";


class RestaurantModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }
    public addressSubschema = {
        street: String, number: String, zip: String, city: String
    }
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                restaurantId:Number,
                name:{type:String, required: true},
                address:[this.addressSubschema],
                phoneNumber: {type:Number, required: true},
                rating:Number,
                email:String,
             //   menu:[MenuItemModel],
               // image: { data: Buffer, contentType: String },
              //  waitlingList: [WaitlistEntryModel],
            }, {collection:'restaurants'}
        );
    }

    public createModel(): void {
        this.model = Mongoose.model<IRestaurantModel>("restaurants", this.schema);
    }

    public retrieveAllRestaurantsLists(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }
    public retrieveAllRestaurantsListBasedOnLocation(response:any,filter:Object): any {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

    
}
export {RestaurantModel};