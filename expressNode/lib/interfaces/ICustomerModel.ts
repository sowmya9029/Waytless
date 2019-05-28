import Mongoose = require("mongoose");
import {AddressSchema} from '../models/Address'

interface ICustomerModel extends Mongoose.Document {
    customerID : Number,
    firstName : String,
    lastName : String,
    address:{street: String, number: String, zip: String, city: String},
    phone : String,
    email : String,
    username:String,
    password:String
}
export {ICustomerModel};