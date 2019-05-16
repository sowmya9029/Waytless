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
    // .subscribe(res => {
    //   return res;
    // });
      .pipe(map((response) => {
        const items: MenuItem[] = response.json();
        
        console.log(items);

        return items;
        // return items.map(i => {
        //   console.log('hello ' + i);
        //   return new MenuItem(i);
        // });

        // return new MenuItem(item());
      }));
      // .catch(this.handleError);
  }

  // public getAllRestaurants() {
  //   return this.http
  //   .get(API_URL + '/restaurantlist')
  //   .map(response => {
  //     const todos = response.json();
  //     return todos.map((todo) => new Todo(todo));
  //   })
  //   .catch(this.handleError);
  // }

  // private handleError (error: Response | any) {
  //   console.error('ApiService::handleError', error);
  //   return Observable.throw(error);
  // }

}
