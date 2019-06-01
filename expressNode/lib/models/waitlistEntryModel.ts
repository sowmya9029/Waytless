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
                queueID: Number,
                customerName: String,
                restaurantID: Number,
                groupSize: Number,
                joinTime: Date,
                quotedtime: Date,
                email : String,
                phone : String,
                notified: Boolean,
                confirmed:Boolean,
                completed: Boolean
            }, {collection: 'waitlist'}
        );
    }

    public createModel(): void {
        this.model = Mongoose.model<IWaitListEntryModel>("waitlist", this.schema);
    }

    public retrieveAllWaitlists(response:any): any {
        var query = this.model.find({});
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }

    public notifyRes(response:any,filter:Object): any {
        this.model.findOneAndUpdate(filter, { $set: { notified: true} }, (err) =>{
            if (err){
                response.send("Error while set notified to true");
            }
            response.send("Mark customer as notified successful!");
        })
    }
    
    public confirmRes(response:any,filter:Object): any {
        this.model.findOneAndUpdate(filter, { $set: { confirmed: true} }, (err) =>{
            if (err){
                response.send("Error while set confirmed to true");
            }
            response.send("Mark customer as confirmed successful!");
        })
    }

    public completeRes(response:any,filter:Object): any {
        this.model.findOneAndUpdate(filter, { $set: { completed: true} }, (err) =>{
            if (err){
                response.send("Error while set completed to true");
            }
            response.send("Complete a reservation successfully!");
        })
    }

    public deleteRes(response:any,filter:Object): any {
        this.model.findOneAndDelete(filter, (err) =>{
            if (err){
                response.send("Error while removing reservation");
            }
            response.send("Removed Reservation.");
        })
    }

    public retrieveAllWaitlistEntriesPerRestaurant(response:any, restaurantID:Number) {
        var query = this.model.find({restaurantID: restaurantID, completed: false});
        query.exec( (err, itemArray) => {
            if(err){
                response.send("Could not find records!")
            }
            response.json(itemArray);
        });
    }
    
    public updateGroupSize(response:any,search_criteria:any,update:any){
        this.model.updateOne(search_criteria, update, (err) =>{
            if (err){
                response.send("Error while updating group size");
            }
            response.send("Updated group size for reservation.");
        });
    }

}
export {WaitlistEntryModel};