import Mongoose = require("mongoose");
import {DataAccess} from '../../DataAccess';
import {IWaitListEntryModel} from '../interfaces/IWaitListEntryModel';

let mongooseConnection = DataAccess.connect;
let mongooseObj = DataAccess.mongooseInstance;

class WaitlistEntryModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                customerName: String,
                restaurantID: Number,
                groupSize: Number,
                joinTime: Date,
                email : String,
                phone : String
            }, {collection: 'waitlist'}
        );
    }

    public createModel(): void {
        this.model = Mongoose.model<IWaitListEntryModel>("waitlist", this.schema);
    }

    public retrieveAllWaitlistEntriesPerRestaurant(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }
}
export {WaitlistEntryModel};