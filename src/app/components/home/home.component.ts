import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { RestaurantAPIService } from 'app/_services/restaurant-api.service';
import { ApiService } from 'app/_services/api.service';
import { Restaurant } from 'app/_models/restaurant';
import { Waitlist } from 'app/_models/waitlist';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
editField: string;
city: string;
search:string;
restaurantName: string;
restuarant:Restaurant[]

  private waitlist: Waitlist[];
  constructor(private router: Router,
    private restaurantAPIService: RestaurantAPIService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        console.log("params"+params['city']);
        this.city = params['city'];
       /* this.restaurantAPIService.getNearByRestaurants(this.city).subscribe(restItems => {
          //this.restaurantName = restItems[this.restaurantId].name;
          this.restuarant = restItems;
          console.log(restItems);
        })*/
        this.restaurantAPIService.getAllRestaurants().subscribe(restItems => {
          //this.restaurantName = restItems[this.restaurantId].name;
          this.restuarant = restItems;
          console.log(restItems);
        })     
      }
      )
  }
  keyDownFunction(event,value) {
    if(event.keyCode == 13) {
      this.route.params.subscribe(params => {
        console.log("params"+this.search);
       this.restaurantAPIService.getNearByRestaurants(this.search).subscribe(restItems => {
          //this.restaurantName = restItems[this.restaurantId].name;
          this.restuarant = restItems;
          console.log("restItems :: "+restItems);
        })
      }
      )
    }
  }
  ngOnInit() {
  }
  onRestaurantClickEvent(){
    this.router.navigate(['./waitlist-entry']);
  }
}
