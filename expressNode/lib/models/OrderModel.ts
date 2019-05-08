import Mongoose = require("mongoose");
import {DataAccess} from '../../DataAccess';
import {IOrderModel} from '../interfaces/IOrderModel'
import {MenuItemModel} from './MenuItemModel'

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class OrderModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    private createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                menuItemId: Number,
                quantity: Number,
                orderTime: Date,
                customerId : Number,
                restaurantID : Number
            }, {collection: 'orders'}
        );
    }

    private createModel(): void {
        this.model = Mongoose.model<IOrderModel>("orders", this.schema);
    }

    public retrieveOrderPerCustomer(response:any, filter:Object) {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }

    public addToCart(response:any,jsonObj:Object){
        this.model.create(jsonObj,(err) =>{
            if (err){
                response.send("Error while adding to cart");
            }
            response.send("Addition successful!!");
        });
    }

    public updateQuantity(response:any,search_criteria:Object,quantity:Object){

        console.log("Search criteria: " + search_criteria);
        console.log("Quantity: " +quantity);
        this.model.update(search_criteria,{$set : {quantity}},(err) =>{
            if(err){
                response.send("Update unsuccessful!");
            }
            response.send("Update successful! Quantity changed");
        });
    }
}
export {OrderModel};