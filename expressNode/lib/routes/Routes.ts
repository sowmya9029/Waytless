import {Request, Response} from "express";
import {RestaurantModel} from '../models/RestaurantModel';


export class Routes {       
    public routes(app): void {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'Waytless!!!!'
            })
        })               
    }
}