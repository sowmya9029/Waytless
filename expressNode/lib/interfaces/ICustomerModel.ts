import Mongoose = require("mongoose");
import {AddressSchema} from '../models/Address'

interface ICustomerModel extends Mongoose.Document {
    firstName : String,
    lastName : String,
    address : any,
    phone : Number,
    email : String
}
export {ICustomerModel};