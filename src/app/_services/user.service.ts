import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }

  public getCurrentUsersName(){
    return this.http.get(API_URL + '/user/details').pipe(map((response) => {
        const user = response.json();
        console.log("Name from userService" + user);
        console.log(user.displayName);
        return user.displayName;
    }));  
  }

  public getUserdetails(): Observable<string[]>{
    return this.http.get(API_URL + '/user/details').pipe(map((response) => {
        const user = response.json();
        console.log("name " + user.displayName);
        console.log("email " + user.emails[0].value);
        console.log("photo " + user.photos[0].value);
        var result: string[] = [user.displayName, user.emails[0].value, user.photos[0].value];
        return result;
    }));  
  }
}
