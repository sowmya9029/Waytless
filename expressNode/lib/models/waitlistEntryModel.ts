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
                quotedtime: Date,
                email : String,
                phone : String,
                notified: Boolean,
                confirmed:Boolean
            }, {collection: 'waitlist'}
        );
    }

    public createModel(): void {
        this.model = Mongoose.model<IWaitListEntryModel>("waitlist", this.schema);
    }

    public retrieveAllWaitlistEntriesPerRestaurant(response:any, filter:Object) {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            if(err){
                response.send("Could not find records!")
            }
            response.json(itemArray);
        });
    }

}
export {WaitlistEntryModel};