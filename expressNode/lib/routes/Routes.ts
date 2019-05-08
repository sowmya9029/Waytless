import {Request, Response} from "express";
import {WaitlistEntryModel} from "../models/waitlistEntryModel"
import { RestaurantModel } from "../models/RestaurantModel";
import { MenuItemModel } from "../models/MenuItemModel";
import { MenuItemCategoryModel } from "../models/MenuItemCategoryModel";
export class Routes {       

    public waitlist:WaitlistEntryModel;
    public restaurantlist:RestaurantModel;
    public menuitem:MenuItemModel;
    public menuitemcat:MenuItemCategoryModel;
    constructor(){

        this.waitlist = new WaitlistEntryModel();
        this.restaurantlist = new RestaurantModel();
        this.menuitem = new MenuItemModel();
        this.menuitemcat = new MenuItemCategoryModel();
    }

    public routes(app): void { 

        app.route('/').get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'Waytless!!!!'
            })
        })          
        
         //get all  menuItems 
            app.route('/menuitems/:restId').get((req: Request, res: Response) => {
                var restId = req.params.restId;
                console.log("Get all menuItems for rest id :"+restId);
                this.menuitem.retrieveAllMenuBasedOnRestaurant(res,{restaurantID:restId});
           })

           //get all  menuItems  by category
            app.route('/menuitems/:restId/:categoryId').get((req: Request, res: Response) => {
                var restId = req.params.restId;
                var categoryId = req.params.categoryId;
                console.log("Get all menuItems for rest id : "+restId + "category : "+categoryId);
                this.menuitem.retrieveAllMenuBasedOnRestaurant(res,{restaurantID:restId,"itemCategory.categoryId": categoryId});
       })
            //add to menuItem of a particular restaurant
            app.route('/menuitems').post((req: Request, res: Response) => {
                var menuitems_entry = {
                    "itemID":req.body.itemID,
                    "itemName":req.body.itemName,
                    "price":req.body.price,
                    "description": req.body.description,
                    "restaurantID":req.body.restaurantID,
                    "itemCategory":
                    {"categoryId":req.body.categoryId,
                    "categoryName":req.body.categoryName,
                    "description":req.body.description}
                }
                this.menuitem.addToMenuItem(res,menuitems_entry);
            })

              //add to menuItem category 
              app.route('/menuitemcategory').post((req: Request, res: Response) => {
                var menuitems_entry = {
                    "categoryId":req.body.categoryId,
                    "categoryName":req.body.categoryName,
                    "description":req.body.description
                }
                this.menuitemcat.addToMenuItemCategory(res,menuitems_entry);
            })

            //delete  menuItem of a particular restaurant
            app.route('/menuitems/:restId/:itemId').delete((req: Request, res: Response) => {
                var restId = req.params.restId;
                var itemId = req.params.itemId;
                this.menuitem.deleteMenuBaseOnRestaurantAndMenuId(res,{"restaurantID":restId,"itemId":itemId});
            })

            //update
            app.route('/menuitems/:restId/:itemId').patch((req: Request, res: Response) => {
                var restId = req.params.restId;
                var itemId = req.params.itemId;;
                var menuitems_entry = {
                    "itemID":req.body.itemID,
                    "itemName":req.body.itemName,
                    "price":req.body.price,
                    "description": req.body.description,
                    "restaurantID":req.body.restaurantID,
                    "itemCategory":
                    {"categoryId":req.body.categoryId,
                    "categoryName":req.body.categoryName,
                    "description":req.body.description}
                }
                this.menuitem.updateMenuBaseOnRestaurantAndMenuId(res,{"restaurantID":restId,"itemId":itemId},menuitems_entry);
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
                "restaurantID" : req.body.restaurantID,
                        "name": req.body.name,
                        "address": {
                                "street": req.body.street,
                                "number": req.body.number, 
                                "zip": req.body.zip,
                                "city": req.body.city
                        },
                        "phoneNumber": req.body.phoneNumber,
                        "email": req.body.email,
                        "rating": req.body.rating
            }
            this.waitlist.addToWaitlist(res,restaurantlist);
        })
        //add to restaurant of a particular restaurant
        app.route('/restaurantuser').post((req: Request, res: Response) => { 
            var restaurantuser = {
                
                      "restaurantID" : req.body.restaurantID,
                        "name": req.body.name,
                       " address": {
                                "street": req.body.street,
                                "number": req.body.number, 
                                "zip": req.body.zip,
                                "city": req.body.city
                        },
                        "phoneNumber": req.body.phoneNumber,
                        "email": req.body.email,              
            }
            this.waitlist.addToWaitlist(res,restaurantuser);
        })

        //add to waitlist of a particular restaurant
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




    }
}