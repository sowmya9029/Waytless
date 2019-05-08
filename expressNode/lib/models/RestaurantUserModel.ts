import Mongoose = require("mongoose");
import {DataAccess} from '../../DataAccess';
import {WaitlistEntryModel} from './WaitlistEntryModel';
import { IRestaurantUserModel } from "../interfaces/IRestaurantUserModel";
import {MenuItemModel} from "./MenuItemModel";

class RestaurantUserModel {
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
                address: [this.addressSubschema],
                phoneNumber: {type:Number, required: true},
                email:String,
            }, {collection: 'restaurant'}
        );
    }

    public createModel(): void {
        this.model = Mongoose.model<IRestaurantUserModel>("restaurant", this.schema);
    }
    //update restaurant 
}
export {RestaurantUserModel};