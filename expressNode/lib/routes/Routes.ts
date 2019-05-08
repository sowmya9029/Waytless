import {Request, Response} from "express";
import {WaitlistEntryModel} from "../models/waitlistEntryModel"
import {MenuItemModel} from "../models/MenuItemModel"


export class Routes {       

    public waitlist:WaitlistEntryModel;
    public menuItem:MenuItemModel;

    constructor(){
        this.waitlist = new WaitlistEntryModel();
        this.menuItem = new MenuItemModel();
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

        // add to menu of a particular restaurant
        app.route('/menuitem/:restId').get((req: Request, res: Response) => {
            var restID = parseInt(req.params.restId);

            console.log("Get all menu items: " + restID);
            
            this.menuItem.retrieveMenu(res, {restaurantID: restID});
        })
    }
}