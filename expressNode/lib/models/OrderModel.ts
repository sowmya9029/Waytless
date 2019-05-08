import Mongoose = require("mongoose");
import {DataAccess} from '../../DataAccess';
import {IOrderModel} from '../interfaces/IOrderModel'
import {MenuItemModel} from './MenuItemModel'

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class OrderModel {
    public schema:any;
    public model:any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    private createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                menuItem: MenuItemModel,
                quantity: Number,
                orderTime: Date,
                customerId : Number,
                restaurantID : Number
            }, {collection: 'orders'}
        );
    }

    private createModel(): void {
        this.model = Mongoose.model<IOrderModel>("orders", this.schema);
    }

    public retrieveOrderPerCustomer(response:any, filter:Object) {
        var query = this.model.findOne(filter);
        query.exec( (err, itemArray) => {
            response.json(itemArray);
        });
    }
}
export {OrderModel};