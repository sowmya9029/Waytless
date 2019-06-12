import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { RestaurantAPIService } from 'app/_services/restaurant-api.service';
import { ApiService } from 'app/_services/api.service';
import { Restaurant } from 'app/_models/restaurant';
import { Waitlist } from 'app/_models/waitlist';
import { UserService } from 'app/_services/user.service';
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
restuarant:Restaurant[];
reviews:number[] = new Array() ;
displayEmail : String;
show:Boolean = true;

  private waitlist: Waitlist[];
  constructor(private router: Router,
    private restaurantAPIService: RestaurantAPIService,
    private route: ActivatedRoute,private userService : UserService) {
      this.route.params.subscribe(params => {
       /* this.restaurantAPIService.getNearByRestaurants(this.city).subscribe(restItems => {
          //this.restaurantName = restItems[this.restaurantId].name;
          this.restuarant = restItems;
          console.log(restItems);
        })*/
        this.restaurantAPIService.getAllRestaurants().subscribe(restItems => {
          //this.restaurantName = restItems[this.restaurantId].name;
          this.restuarant = restItems;
          console.log("restItems"+this.restuarant);
          for (var i = 0; i < restItems[i].rating; i++) {
            this.reviews[restItems[i].rating] = i;
            console.log(restItems[i].rating);
         }
        
        });

        this.userService.getCurrentUsersEmail().subscribe(currentUserDisplayName => {

          this.displayEmail = currentUserDisplayName;
          console.log(this.displayEmail);
          this.show = false;
        });
        
        
      }
      )
  }

  createStarArray(n) {
    return new Array(n);
  }

  createEmptyStarArray(n) {
    return new Array((5 - n));
  }
  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.route.params.subscribe(params => {
        console.log("params" + this.search);
        this.restaurantAPIService.getNearByRestaurants(this.search).subscribe(restItems => {
          this.restuarant = restItems;
          console.log("restItems :: " + restItems);
        })
      }
      )
    }
  }
  ngOnInit() {
  }


  onRestaurantClickEvent(resturantId,restaurant_owner_email) {
    console.log("resturantId---" + restaurant_owner_email.textContent);
    // the owner of restaurant 

     this.router.navigate(['./waitlist-entry/' + resturantId.textContent]);
  }

  public logout(){
    this.userService.logoutUser();
    this.router.navigate(['']);
  }
  onLoginClickEvent(resturantId) {

  }
}
