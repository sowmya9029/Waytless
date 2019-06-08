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

  public authenticateLogin(){
    return this.http.get(API_URL + '/auth/google', {}).subscribe(response => {
      console.log(response.status);
      });
  }
}
