import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Waitlist } from '../_models/waitlist';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class WaitlistService {

  constructor(private http:Http) { }

  storeWaitlistEntry(waitlistEntry:Waitlist){
    console.log("Adding to waitlist..");
    return this.http.post(API_URL + '/waitlist' ,waitlistEntry).subscribe(response => {
      console.log(response.status);
      });
  }

  public getWaitlist(restaurantID: number): Observable<Waitlist[]> {
    return this.http.get(API_URL + '/waitlist/' + restaurantID)
      .pipe(map((response) => {
        const items: Waitlist[] = response.json();
        console.log(Waitlist);
        return items;
      }));
  }

  public removeFromWaitlist(restaurantID: number, queueID: number) {
    console.log("removing reservation..." + queueID);
    return this.http.delete(API_URL + '/waitlist/' + restaurantID + '/' + queueID, {}).subscribe(response => {
      console.log(response.status);
      });
  }

  public updateGroupSize(restaurantID: number, queueID: number, groupSize: number) {
    console.log("Updating group gize for ..." + queueID + " in " + restaurantID);
    return this.http.patch(API_URL + '/waitlist/' + restaurantID + '/' + queueID, {"groupSize" : groupSize}).subscribe(response => {
      console.log(response.status);
      });
  }
}
