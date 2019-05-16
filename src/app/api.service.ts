import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { MenuItem } from './_models';
import { map } from "rxjs/operators";

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
