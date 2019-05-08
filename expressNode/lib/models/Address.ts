import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const AddressSchema = new Schema({
    street: String, 
    number: String, 
    zip: String, 
    city: String
});