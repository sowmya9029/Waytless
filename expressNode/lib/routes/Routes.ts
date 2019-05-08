import {Request, Response} from "express";
import {WaitlistEntryModel} from "../models/waitlistEntryModel";
import {OrderModel} from "../models/OrderModel";


export class Routes {       

    public waitlist:WaitlistEntryModel;
    public order:OrderModel;
    //public menuItem:MenuItemModel;

    constructor(){

        this.waitlist = new WaitlistEntryModel();
        this.order = new OrderModel();
        //this.menuItem = new MenuItemModel();
    }

    public routes(app): void { 

        app.route('/').get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'Waytless!!!!'
            })
        })          
        
        // to get all the waitlist entries in a restaurant
        app.route('/waitlist/:restId').get((req: Request, res: Response) => {
            var restuarantId = req.params.restId;
            
            console.log("Get all waitlist items from restaurant with id: " + restuarantId);

            this.waitlist.retrieveAllWaitlistEntriesPerRestaurant(res,{restaurantID:restuarantId});
        })

        // add to waitlist of a particular restaurant
        app.route('/waitlist').post((req: Request, res: Response) => {
            var waitlist_entry = {
                "customerName":req.body.customerName,
                "restaurantID":req.body.restaurantID,
                "groupSize":req.body.groupSize,
                "joinTime": req.body.joinTime,
                "email":req.body.email,
                "phone":req.body.phone,
                "notified":req.body.notified,
                "confirmed":req.body.confirmed
            }
            this.waitlist.addToWaitlist(res,waitlist_entry);
        })

        // retrive order cart for a customer in a restaurant's cart
        app.route('/orders/:restaurantId/:customerId').get((req: Request, res: Response) =>{
            var customerId = req.params.customerId;
            var restaurantId = req.params.restaurantId;

            this.order.retrieveOrderPerCustomer(res,{restaurantID:restaurantId,customerId:customerId});
            
        })

        // add to orderCart
        app.route('/orders').post((req: Request, res: Response) => {

            console.log("Restaurant id:" + req.body.restaurantID);
            

            var jsonObj = {
                "menuItemId" : req.body.menuItemId,
                "quantity" : req.body.quantity,
                "orderTime": req.body.orderTime,
                "customerId" : req.body.customerId,
                "restaurantID" : req.body.restaurantID
            }

            this.order.addToCart(res,[jsonObj]);
        })

        // edit the quantity of an order in the cart
        app.route('/orders').patch((req:Request,res:Response) => {
            var customerId = req.body.customerId;
            var restaurantId = req.body.restaurantID;
            var menuItemId = req.body.menuItemId;
            var quantity = req.body.quantity;

            var searchCriteria = {
                "customerId" : customerId,
                "restaurantID" : restaurantId,
                "menuItemId" : menuItemId
            }
            this.order.updateQuantity(res,searchCriteria,{quantity:quantity});
        })
    }
}