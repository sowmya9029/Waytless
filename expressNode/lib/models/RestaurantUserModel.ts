import Mongoose = require("mongoose");
import {DataAccess} from '../../DataAccess';
import {WaitlistEntryModel} from './WaitlistEntryModel';
import { IRestaurantUserModel } from "../interfaces/IRestaurantUserModel";
import {MenuItemModel} from "./MenuItemModel";
let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

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
                address: [this.addressSubschema],
                phoneNumber: {type:Number, required: true},
                email:String,
            }, {collection: 'lists'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IRestaurantUserModel>("Restaurant", this.schema);
    }
    //update restaurant 
}
export {RestaurantModel};