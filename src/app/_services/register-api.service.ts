import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../_models';
import { map } from "rxjs/operators";
import { Customer } from '../_models/customer';
import { Restaurant } from '../_models/restaurant';
import { Waitlist } from '../_models/waitlist';
@Injectable({
  providedIn: 'root'
})
const API_URL = environment.apiUrl;
export class RegisterApiService {
  constructor(
    private http: Http
  ) { 

  }
  public registerCustomer(customer: Customer[]) {
    customer.forEach(c => {
      console.log('posting order!');
      console.log(c);
      let response = this.http.post(API_URL + '/customers', {
        "customerId":c.customerID,
        "firstName" : c.firstName,
        "lastName" : c.lastName,
        "address":{ "street":c.address.street,"number": c.address.number, 
        "zip": c.address.zip,
        "city":c.address.city},
        "phone" : c.phone,
        "email" : c.email,
        "username":c.username,
        "password":c.password
      });
      response.subscribe(r => console.log(r));
    });
  }

}
