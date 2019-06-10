import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Waitlist } from '../_models/waitlist';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class WaitlistService {

  constructor(private http: Http) { }

  public storeWaitlistEntry(waitlistEntry: Waitlist) {
    console.log("Adding to waitlist..");
    return this.http.post(API_URL + '/waitlist', waitlistEntry).subscribe(response => {
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

  public notifyCustomer(restaurantID: number, queueID: number) {
    console.log("notifying customer..." + queueID);
    return this.http.get(API_URL + '/waitlist/' + restaurantID + '/notify/' + queueID, {}).subscribe(response => {
      console.log(response.status);
    });
  }

  public confirmCustomer(restaurantID: number, queueID: number) {
    console.log("confirming customer..." + queueID);
    return this.http.get(API_URL + '/waitlist/' + restaurantID + '/confirm/' + queueID, {}).subscribe(response => {
      console.log(response.status);
    });
  }

  public removeReservation(restaurantID: number, queueID: number) {
    console.log("removing reservation..." + queueID);
    return this.http.delete(API_URL + '/waitlist/' + restaurantID + '/' + queueID, {}).subscribe(response => {
      console.log(response.status);
    });
  }

  public completeReservation(restaurantID: number, queueID: number) {
    console.log("Complete reservation..." + queueID + " in " + restaurantID);
    return this.http.post(API_URL + '/waitlist/' + restaurantID + '/complete/' + queueID, {}).subscribe(response => {
      console.log(response.status);
    });
  }

  public updateGroupSize(restaurantID: number, queueID: number, groupSize: number) {
    console.log("Updating group gize for ..." + queueID + " in " + restaurantID);
    return this.http.patch(API_URL + '/waitlist/' + restaurantID + '/' + queueID, { "groupSize": groupSize }).subscribe(response => {
      console.log(response.status);
    });
  }
}
