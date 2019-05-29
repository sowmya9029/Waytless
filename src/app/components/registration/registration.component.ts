import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterApiService } from 'app/_services/register-api.service';
export interface User {
  value: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  
  username: string;
  password:string;
  email: string;
  phone: string;
  firstname: string;
  lastname: string;
  selected:string;
  private customer: Map<number, number>;
 
  onUpload() {
    // upload code goes here
  }
  
  disableSelect = new FormControl(false);
  constructor(private router: Router,
    private registratAPIService: RegisterApiService,
    
    private route: ActivatedRoute) { 
      this.customer = new Map();
  }

  ngOnInit() {
  }

  register()
  {
    this.route.params.subscribe(params => {
       let customer = [];
       let m = this.customer;
         customer.push({
          customerID: 1,
          firstName: this.firstname,
          lastName: this.lastname,
          phone : this.phone,
          address:{street:"",number:"",zip:"",city:""},
          email : this.email,
          password : this.password,
          username : this.username
       })
       this.registratAPIService.registerCustomer(customer);
       alert('Registered succefully');
       this.router.navigate(['./']); 


       
       
     }
     )
  }

}
