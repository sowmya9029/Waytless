import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { MenuItem } from './_models';
import { map } from "rxjs/operators";
import { Order } from './_models/order';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: Http
  ) { 

  }

  public getAllMenuItems(restaurantID: number): Observable<MenuItem[]> {
    return this.http.get(API_URL + '/menuitems/' + restaurantID)
      .pipe(map((response) => {
        const items: MenuItem[] = response.json();
        console.log(items);
        return items;
      }));
  }

  public makeOrders(orders: Order[]) {
    orders.forEach(o => {
      console.log('posting order!');
      console.log(o);
      let response = this.http.post(API_URL + '/orders', {
        "menuitemId" : o.menuItemId,
        "quantity" : o.quantity,
        "orderTime": o.orderTime,
        "customerId" : o.customerId,
        "restaurantID" : o.restaurantID
      });
      response.subscribe(r => console.log(r));
    });
  }

  public getAllOrders(restaurantID: number, customerID: number): Observable<Order[]> {
    return this.http.get(API_URL + '/orders/' + restaurantID + '/' + customerID)
      .pipe(map((response) => {
        const items: Order[] = response.json();
        console.log(items);
        return items;
      }));
  }

  // public getAllRestaurants() {
  //   return this.http.get(API_URL + '/restaurantlist')
  //   .pipe(map(response => {
  //     const restaurants: Restaurant[] = response.json();
  //     return restaurants.map((todo) => new Restaurant(todo));
  //   }));
  // }

}
