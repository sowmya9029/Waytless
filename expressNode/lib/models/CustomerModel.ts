import Mongoose = require("mongoose");
//import {DataAccess} from '../../DataAccess';

import {ICustomerModel} from '../interfaces/ICustomerModel';
import {AddressSchema} from './Address'
// import { number } from "prop-types";

//let mongooseConnection = DataAccess.mongooseConnection;
//let mongooseObj = DataAccess.mongooseInstance;

class CustomerModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    private createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                customerId: Number,
                firstName : String,
                lastName : String,
                address : AddressSchema,
                phone : String,
                email : String,
                username :String,
                password:String
            }, {collection: 'customer'}
        );
    }

    private createModel(): void {
        this.model = Mongoose.model<ICustomerModel>("customer", this.schema);
    }

    // return all customers
    public getAllCustomers(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }
    public addToCustomer(response:any,jsonObject:any){
        this.model.create(jsonObject,(err) =>{
            if (err){
                response.send("Error while adding to customer");
            }
            response.send("Addition successful!!");
        });

    }
    public getAllCustomersOnFilter(response:any,filter:Object): any {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

}
export {CustomerModel};
