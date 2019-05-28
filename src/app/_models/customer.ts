export class Customer {
    customerID : Number;
    firstName : String;
    lastName : String;
    address:{street: String, number: String, zip: String, city: String};
    phone : String;
    email : String;
    username:String;
    password:String;
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}