import {Request, Response} from "express";
import {WaitlistEntryModel} from "../models/waitlistEntryModel"
import {MenuItemModel} from "../models/MenuItemModel"
import { RestaurantModel } from "../models/RestaurantModel";
import {CustomerModel} from "../models/CustomerModel";
import { MenuItemCategoryModel } from "../models/MenuItemCategoryModel";
import {OrderModel} from "../models/OrderModel";




export class Routes {       

    public waitlist:WaitlistEntryModel;
    public order:OrderModel;
    public restaurantlist:RestaurantModel;
    public menuitem:MenuItemModel;
    public menuitemcat:MenuItemCategoryModel;
    public customerlist:CustomerModel;
    public idGenerator:number;

    constructor(){
        this.waitlist = new WaitlistEntryModel();
        this.order = new OrderModel();
        //this.menuItem = new MenuItemModel();
        this.idGenerator = 100;
        this.customerlist = new CustomerModel();
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

        // to get all the waitlist entries
        app.route('/waitlist/').get((req: Request, res: Response) => {
            console.log('Query all wait lists');

            this.waitlist.retrieveAllWaitlists(res);
        })


        // set customer as notifed in waitlist
        app.route('/waitlist/:restaurantID/notify/:queueID').get((req:Request,res:Response) => {
            var restaurantId = req.params.restaurantID;
            var queueID = req.params.queueID;
            console.log("Set customer as notified for " + queueID + " in " + restaurantId);
            this.waitlist.notifyRes(res, {restaurantID:restaurantId, queueID:queueID});
        })

        // set customer as confirmed in waitlist
        app.route('/waitlist/:restaurantID/confirm/:queueID').get((req:Request,res:Response) => {
            var restaurantId = req.params.restaurantID;
            var queueID = req.params.queueID;
            console.log("Set customer as confirmed for " + queueID + " in " + restaurantId);
            this.waitlist.confirmRes(res, {restaurantID:restaurantId, queueID:queueID});
        })
        
        // remove reservation in waitlist
        app.route('/waitlist/:restaurantID/:queueID').delete((req:Request,res:Response) => {
            var restaurantId = req.params.restaurantID;
            var queueID = req.params.queueID;
            console.log("Removing reservation: " + queueID + " in " + restaurantId);
            this.waitlist.deleteRes(res, {restaurantID:restaurantId, queueID:queueID});
        })

        // update group size for reservation in waitlist
        app.route('/waitlist/:restaurantID/:queueID').patch((req:Request,res:Response) => {
            var restaurantId = req.params.restaurantID;
            var queueID = req.params.queueID;
            var groupSize = req.body.groupSize;

            const searchCriteria = {
                "restaurantID" : restaurantId,
                "queueID" : queueID
            }

            const toBeChanged = {
                "$set": {
                    "groupSize": groupSize
                  }
            }
            console.log("Updating group size for reservation: " + queueID + " in " + restaurantId);
            this.waitlist.updateGroupSize(res, searchCriteria, toBeChanged);
        })

        // to get all the waitlist entries in a restaurant
        app.route('/waitlist/:restId').get((req: Request, res: Response) => {
            var restuarantId = req.params.restId;
            
            console.log("Query all waitlist items from restaurant with id: " + restuarantId);

            this.waitlist.retrieveAllWaitlistEntriesPerRestaurant(res,{restaurantID:restuarantId});
        })

        

        //get all customers
        app.route('/customers').get((req: Request, res: Response) => {
        console.log("Get all customers"+res);
        this.customerlist.getAllCustomers(res);
    })

        // get all customer with given ID
        app.route('/customers/:customerId').get((req: Request, res: Response) => {
            var customerId = req.params.customerId;
            console.log("Get all customer using ID: " + customerId);
            this.customerlist.getAllCustomersOnFilter(res,{ "customerId": customerId });
        })

        // get all customers with given last name
        app.route('/customers/lastName/:lastName').get((req: Request, res: Response) => {
            var lastName = req.params.lastName;
            console.log("Get all customer(s) with last name: " + lastName);
            this.customerlist.getAllCustomersOnFilter(res,{ "lastName": lastName });
        })

        // get all customers with given first name
        app.route('/customers/firstName/:firstName').get((req: Request, res: Response) => {
            var firstName = req.params.firstName;
            console.log("Get all customer(s) with first name: " + firstName);
            this.customerlist.getAllCustomersOnFilter(res,{ "firstName": firstName });
        })

        // add to customer to DB
            app.route('/customers').post((req: Request, res: Response) => {
                console.log(req.body);
                var jsonObj = req.body;
                jsonObj.customerId = this.idGenerator;
                this.customerlist.model.create([jsonObj], (err) => {
                    if (err) {
                        console.log('object creation failed');
                    }
                });
                res.send("Customer Added! customerID is " + this.idGenerator.toString());
                this.idGenerator++;
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

          // to restaurant by id
          app.route('/restaurantlist/id/:id').get((req: Request, res: Response) => {
            var id = req.params.id;
            console.log("Get all restaurants  with id: " + id);
            this.restaurantlist.retrieveAllRestaurantsListBasedOnId(res,{ "restaurantID": id });
        })

        app.route('/restaurantlist').post((req: Request, res: Response) => {   
            console.log(req.body);
            var jsonObj = req.body;
            this.restaurantlist.model.create([jsonObj], (err) => {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send("Restaurant Added.");
        })
       
        //add to waitlist of a particular restaurant
        app.route('/waitlist').post((req: Request, res: Response) => {
            console.log(req.body);
            var jsonObj = req.body;
            this.waitlist.model.create([jsonObj], (err) => {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send("You are added to the waitlist.");
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
                "menuItemId" : req.body.menuitemId,
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