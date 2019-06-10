import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Order } from '../_models/order';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: Http) { 

  }

  public makeOrders(orders: Order[]): Observable<Response>[] {
    var list = [];
    orders.forEach(o => {
      console.log('posting order!');
      console.log(o);
      let response = this.http.post(API_URL + '/orders', {
        "orderId" : o.orderId,
        "menuitemId" : o.menuItemId,
        "quantity" : o.quantity,
        "orderTime": o.orderTime,
        "customerId" : o.customerId,
        "restaurantID" : o.restaurantID
      });
      list.push(response);
    });
    return list;
  }

  public getAllOrders(restaurantID: number, customerID: number): Observable<Order[]> {
    return this.http.get(API_URL + '/orders/' + restaurantID + '/' + customerID)
      .pipe(map((response) => {
        const items: Order[] = response.json();
        console.log(items);
        return items;
      }));
  }

  public getOrder(orderId: String): Observable<Order[]> {
    return this.http.get(API_URL + '/order/' + orderId)
      .pipe(map((response) => {
        const items: Order[] = response.json();
        console.log(items);
        return items;
      }));
  }
}
