import Mongoose = require("mongoose");
import { IRestaurantModel } from "../interfaces/IRestaurantModel";
import {AddressSchema} from './Address'


class RestaurantModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                restaurantID:Number,
                name:{type:String, required: true},
                address:AddressSchema,
                phoneNumber: {type:Number, required: true},
                rating:Number,
                email:String,
                cuisine:String,
                reviews:Number,
                booked:Number,
                url:String
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

    public retrieveAllRestaurantsListBasedOnId(response:any,filter:Object): any {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

    public addToRestaurantList(response:any,jsonObject:any){
        this.model.create(jsonObject,(err) =>{
            if (err){
                response.send("Error while adding to restaurantlist");
            }
            response.send("Addition successful!!");
        });

    }
    
}
export {RestaurantModel};