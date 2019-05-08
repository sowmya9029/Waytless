import Mongoose = require("mongoose");
import {DataAccess} from '../../../DataAccess';
import {WaitlistEntryModel} from './WaitlistEntryModel';
import { IRestaurantModel } from "../interfaces/IRestaurantModel";
let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class restaurantModel {
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
                rating:Number,
                email:String,
                waitlingList: [waitlistEntryModel],
            }, {collection: 'lists'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IRestaurantModel>("Restaurant", this.schema);
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
export {restaurantModel};