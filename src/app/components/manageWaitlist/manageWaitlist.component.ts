import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantAPIService } from 'app/_services/restaurant-api.service';
import { WaitlistService } from 'app/_services/waitlist.service';
import { Waitlist } from 'app/_models/waitlist';
import { Restaurant} from 'app/_models/restaurant';
import { UserService } from 'app/_services/user.service';

@Component({
  selector: 'app-manageWaitlist',
  templateUrl: './manageWaitlist.component.html',
  styleUrls: ['./manageWaitlist.component.css']
})
export class manageWaitlistComponent {

  editField: string;
  restaurantId: number;
  restaurantName: string;
  waitlist: Waitlist[];
  restItems: Restaurant[];
  //avaliableRestaurants: Restaurant[];
  avgWaitMin: number;
  userItems: any[];
  owner: string;
  displayName: string;
  username: string;
  profilePic: string;

  constructor(
    private waitlistService: WaitlistService,
    private restaurantAPIService: RestaurantAPIService,
    private userService : UserService,
    private route: ActivatedRoute) {
    //this.route.params.subscribe(params => {
    //  this.restaurantId = params['id'];
    //}),
    this.restaurantAPIService.getAllRestaurants().subscribe(restItems => {
      this.restItems = restItems;
    }),
    this.userService.getUserdetails().subscribe(userItems => {
      this.userItems = userItems;
      this.displayName = this.userItems[0];
      this.username = this.userItems[1];
      this.profilePic = this.userItems[2];
    })
    
  }

  ngOnInit() {
    this.getWaitlist();
    this.getRestaurantInfo();
    //this.avgWaitMin = this.avgWaittime(this.waitlist);
  }


  getRestaurantInfo() {
    console.log("rest " + this.restItems.length );
    this.restItems.forEach((item, index) => {
      if(item.owner == this.username) {
        //this.avaliableRestaurants.push(this.restItems[index]);
        this.restaurantName = this.restItems[index].name;
        this.restaurantId = this.restItems[index].restaurantID;
      }
    });
    //console.log(this.avaliableRestaurants.length);
  }

  avgWaittime(wl: Waitlist[]): number {
    var sum = 0;
    wl.forEach(element => {
      var eventStartTime = new Date(element.quotedtime);
      var eventEndTime = new Date(element.joinTime);
      var diff = eventEndTime.valueOf() - eventStartTime.valueOf();
      var diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
      sum += diffMins;
    });
    //console.log("sum" + sum);
    //console.log("avg "+ sum / wl.length);
    return Math.abs(Math.round((sum / wl.length)));
  }

  notify(queueID: number) {
    console.log("notify" + queueID);
    this.waitlistService.notifyCustomer(this.restaurantId, queueID);
    this.getWaitlist();
  }

  confirm(queueID: number) {
    console.log("confirm" + queueID);
    this.waitlistService.confirmCustomer(this.restaurantId, queueID);
    this.getWaitlist();
  }

  complete(queueID: number) {
    console.log("complete" + queueID);
    this.waitlistService.completeReservation(this.restaurantId, queueID);
    this.getWaitlist();
  }

  remove(queueID: number) {
    console.log("remove" + queueID);
    this.waitlistService.removeReservation(this.restaurantId, queueID);
    this.getWaitlist();
  }

  refreshTable(queueID: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  updateGroupSize(queueID: number, property: string, event: any) {
    console.log("updating group size" + queueID);
    const editField = event.target.textContent;
    this.waitlistService.updateGroupSize(this.restaurantId, queueID, editField);
  }

  getWaitlist() {
    console.log(" getWaitlist() ");
    if (this.restaurantId) {
      this.waitlistService.getWaitlist(this.restaurantId).subscribe(waitlistItems => {
        this.waitlist = waitlistItems;
        this.avgWaitMin = this.avgWaittime(this.waitlist);
      });
    }

  }

}