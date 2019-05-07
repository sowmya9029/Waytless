import Mongoose = require("mongoose");
import {DataAccess} from '../../../DataAccess';



let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class waitlistEntryModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                name: String,
                description: String,
                listId: Number,
                due: String,
                state: String,
                owner: String
            }, {collection: 'lists'}
        );
    }

    public createModel(): void {
        
    }

    public retrieveAllLists(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }
}
export {waitlistEntryModel};