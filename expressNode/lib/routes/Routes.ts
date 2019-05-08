import {Request, Response} from "express";
import {WaitlistEntryModel} from "../models/waitlistEntryModel"
import {MenuItemModel} from "../models/MenuItemModel"
import { RestaurantModel } from "../models/RestaurantModel";


import { MenuItemCategoryModel } from "../models/MenuItemCategoryModel";
import {OrderModel} from "../models/OrderModel";




export class Routes {       

    public waitlist:WaitlistEntryModel;
    public order:OrderModel;
    public restaurantlist:RestaurantModel;
    public menuitem:MenuItemModel;
    public menuitemcat:MenuItemCategoryModel;
    constructor(){
        this.waitlist = new WaitlistEntryModel();
        this.order = new OrderModel();
        //this.menuItem = new MenuItemModel();
        
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
            app.route('/menuitems/:restId/:itemID').delete((req: Request, res: Response) => {
                var restId = req.params.restId;
                var itemID = req.params.itemID;
                this.menuitem.deleteMenuBaseOnRestaurantAndMenuId(res,{"restaurantID":restId,"itemID":itemID});
            })

            //update
            app.route('/menuitems').patch((req: Request, res: Response) => {
                
                var menuitems_entry = {
                    "itemID":req.body.itemID,
                    "itemName":req.body.itemName,
                    "price":req.body.price,
                    "description": req.body.description,
                    "restaurantID":req.body.restaurantID,
                    "itemCategory.categoryId"
                    :req.body.categoryId,
                    "itemCategory.categoryName":req.body.categoryName,
                    "itemCategory.description":req.body.description
                }

               
            var restaurantId = req.body.restaurantID;
            var itemID = req.body.itemID;
           

            const searchCriteria = {
               
                "restaurantID" : restaurantId,
                "itemID" : itemID
            }

            const toBeChanged = {
                "$set": {
                    "itemID":req.body.itemID,
                    "itemName":req.body.itemName,
                    "price":req.body.price,
                    "description": req.body.description,
                    "restaurantID":req.body.restaurantID,
                    "itemCategory.categoryId"
                    :req.body.itemCategory.categoryId,
                    "itemCategory.categoryName":req.body.itemCategory.categoryName,
                    "itemCategory.description":req.body.itemCategory.description
                  }
            }

           

                this.menuitem.updateMenuBaseOnRestaurantAndMenuId(res,searchCriteria,toBeChanged);
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
                "menuitemID" : req.body.menuitemID,
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
            var menuitemID = req.body.menuitemID;
            var quantity = req.body.quantity;

            const searchCriteria = {
                "customerId" : customerId,
                "restaurantID" : restaurantId,
                "menuitemID" : menuitemID
            }

            const toBeChanged = {
                "$set": {
                    "quantity": quantity
                  }
            }

            this.order.updateQuantity(res,searchCriteria,toBeChanged);
        })

       
    }
}