import Mongoose = require("mongoose");
import {AddressSchema} from '../models/Address'

interface ICustomerModel extends Mongoose.Document {
    firstName : String,
    lastName : String,
    address:{street: String, number: String, zip: String, city: String},
    phone : String,
    email : String
}
export {ICustomerModel};