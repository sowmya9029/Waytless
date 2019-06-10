import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../_models';
import { map } from "rxjs/operators";
import { Order } from '../_models/order';
import { Restaurant } from '../_models/restaurant';
import { Waitlist } from '../_models/waitlist';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RestaurantAPIService {

  constructor(
    private http: Http
  ) {

  }

  public getAllRestaurants() {
    return this.http.get(API_URL + '/restaurantlist')
      .pipe(map(response => {
        const restaurants: Restaurant[] = response.json();
        console.log(restaurants);
        return restaurants;
      }));
  }

  public getNearByRestaurants(city: String) {
    console.log("restaurant API city " + city);
    return this.http.get(API_URL + '/restaurantlist/' + city)
      .pipe(map(response => {
        const restaurants: Restaurant[] = response.json();
        console.log("restaurants" + restaurants);
        return restaurants;
      }));
  }

}
