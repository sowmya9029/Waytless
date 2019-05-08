import Mongoose = require("mongoose");
import {DataAccess} from '../../../DataAccess';
import {ICustomerModel} from '../interfaces/ICustomerModel';
import {AddressSchema} from './Address'

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

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
                phone : Number,
                email : String
            }, {collection: 'customer'}
        );
    }

    private createModel(): void {
        this.model = mongooseConnection.model<ICustomerModel>("customer", this.schema);
    }

}
export {CustomerModel};