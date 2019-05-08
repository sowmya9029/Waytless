import Mongoose = require("mongoose");

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
    //static DB_CONNECTION_STRING:string = 'mongodb://dbAdmin:test@localhost:3000/waitlistSample?authSource=admin';
    static DB_CONNECTION_STRING:string = 'mongodb://localhost:27017/waitlistSample';

    constructor () {
        DataAccess.connect();
    }
    
    static connect (): Mongoose.Connection {
        console.log("Just entered connect1()");
        if(this.mongooseInstance) return this.mongooseInstance;
        console.log("Just entered connect()");
        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        
        this.mongooseInstance = Mongoose.connect(this.DB_CONNECTION_STRING, { useNewUrlParser: true });
        console.log("here!");
        return this.mongooseInstance;
    }
    
}
//DataAccess.connect();
export {DataAccess};
