import {Request, Response} from "express";
import {WaitlistEntryModel} from "../models/waitlistEntryModel"


export class Routes {       

    public waitlist:WaitlistEntryModel;

    constructor(){

        this.waitlist = new WaitlistEntryModel();
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
    }
}