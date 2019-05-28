import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { MenuItem } from 'app/_models';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MenuApiService {

  constructor(private http: Http) { }

  public getAllMenuItems(restaurantID: number): Observable<MenuItem[]> {
    return this.http.get(API_URL + '/menuitems/' + restaurantID)
      .pipe(map((response) => {
        const items: MenuItem[] = response.json();
        console.log(items);
        return items;
      }));
  }
}
