import Mongoose = require("mongoose");
import { IMenuItemModel } from "../interfaces/IMenuItemModel";

class MenuItemModel {
    public schema:any;
    public model:any;

    public constructor() {
 
        this.createSchema();
        this.createModel();
    }
  
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                restaurantID:Number,
                itemID: Number,
                itemName: String,
                itemCategory: Object,
                description:String,
                //type:String,
                url: String,
                price :Number
            }, {collection: 'menuitems'}
        );
    }

    public createModel(): void {
        this.model = Mongoose.model<IMenuItemModel>("menuitems", this.schema);
    }
   
   //retrieve menu based on restaurant 
    public retrieveAllMenuBasedOnRestaurant(response:any, filter:Object) {
        var query = this.model.find(filter);
        query.exec( (err, itemArray) => {
            if(err){
                response.send("Could not find records!")
            }
            response.json(itemArray);
        });
    }
//retrieve menu based on restaurant 
public retrieveMenuBasedOnRestaurantAndCategory(response:any, filter:Object) {
    var query = this.model.find(filter);
    query.exec( (err, itemArray) => {
        if(err){
            response.send("Could not find records!")
        }
        response.json(itemArray);
    });
}
 //add menu item to restaurant
    public addToMenuItem(response:any,jsonObject:any){
        this.model.create(jsonObject,(err) =>{
            if (err){
                response.send("Error while adding to waitlist");
            }
            response.send("Addition successful!!");
        });
    }

   
 //delete menu item to restaurant and itemID
    public deleteMenuBaseOnRestaurantAndMenuId(response:any,filter:Object): any {
       
        this.model.deleteOne(filter, function (err) {
            if (err){
                response.send("Error while deleting to waitlist");
            }
            response.send("Addition successful!!");
    
        });
    }

    public updateMenuBaseOnRestaurantAndMenuId(response:any,search_criteria:any,update:any){

        this.model.updateOne(search_criteria, update)
        .then(result => {
            
            response.send('Successfully changed quantity');
            
        });
          
    }
     //update menu item to restaurant and itemID
  /*   public updateMenuBaseOnRestaurantAndMenuId(response:any,filter:Object,json:Object): any {
        this.deleteMenuBaseOnRestaurantAndMenuId(response,Object);
        this.addToMenuItem(response,json);
    }*/
}
    export {MenuItemModel};
/*Cat.findOneAndUpdate({age: 17}, {$set:{name:"Naomi"}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    
        console.log(doc);
    });*/

  /*  var query = { name: 'bourne' };
Model.update(query, { name: 'jason bourne' }, options, callback)* updateMany 
}*/
