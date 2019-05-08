import {Request, Response} from "express";
import {WaitlistEntryModel} from "../models/waitlistEntryModel"
import {MenuItemModel} from "../models/MenuItemModel"
import { RestaurantModel } from "../models/RestaurantModel";


export class Routes {       

    public waitlist:WaitlistEntryModel;
    public menuItem:MenuItemModel;
    public restaurantlist:RestaurantModel;

    constructor(){
        this.waitlist = new WaitlistEntryModel();
        this.menuItem = new MenuItemModel();
        this.restaurantlist = new RestaurantModel();
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

        //get all  restaurants 
        app.route('/restaurantlist').get((req: Request, res: Response) => {
            console.log("Get all restaurants"+res);
            this.restaurantlist.retrieveAllRestaurantsLists(res);
        })

 // to get all nearby restaurant
 app.route('/restaurantlist/:city').get((req: Request, res: Response) => {
    var city = req.params.city;
    console.log("Get all restaurants  with city: " + city);
    this.restaurantlist.retrieveAllRestaurantsListBasedOnLocation(res,{ "address.city": city });
})

// add to restaurant of a particular restaurant
app.route('/restaurantlist').post((req: Request, res: Response) => {
   
    var restaurantlist = {
                 restaurantId : req.body.restaurantID,
                name: req.body.name,
                address: {
                        "street": req.body.street,
                        "number": req.body.number, 
                        "zip": req.body.zip,
                        "city": req.body.city
                },
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                rating: req.body.rating
    }
    this.waitlist.addToWaitlist(res,restaurantlist);
})
// add to restaurant of a particular restaurant
app.route('/restaurantuser').post((req: Request, res: Response) => {
   
    var restaurantuser = {
        
                 restaurantId : req.body.restaurantID,
                name: req.body.name,
                address: {
                        "street": req.body.street,
                        "number": req.body.number, 
                        "zip": req.body.zip,
                        "city": req.body.city
                },
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
               
    }
    this.waitlist.addToWaitlist(res,restaurantuser);
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

        // get menu of a particular restaurant
        app.route('/menuitem/:restId').get((req: Request, res: Response) => {
            var restID = parseInt(req.params.restId);

            console.log("Get all menu items: " + restID);
            
            this.menuItem.retrieveMenu(res, {restaurantID: restID});
        })

    }
}