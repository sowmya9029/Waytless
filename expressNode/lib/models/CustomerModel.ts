import Mongoose = require("mongoose");
//import {DataAccess} from '../../DataAccess';

import {ICustomerModel} from '../interfaces/ICustomerModel';
import {AddressSchema} from './Address'

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
                firstName : String,
                lastName : String,
                address : AddressSchema,
                phone : String,
                email : String
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
    
    public getAllCustomersOnFilter(response:any,filter:Object): any {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

    // add customer to DB
    public addCustomer(response:any,jsonObject:any){
        this.model.create(jsonObject,(err) =>{
            if (err){
                response.send("Error while adding customer to DB");
            }
            response.send("Addition successful!!");
        });

    }


}
export {CustomerModel};
