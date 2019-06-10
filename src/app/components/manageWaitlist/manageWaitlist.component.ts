import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantAPIService } from 'app/_services/restaurant-api.service';
import { WaitlistService } from 'app/_services/waitlist.service';
import { Waitlist } from 'app/_models/waitlist';

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
  avgWaitMin: number;

  constructor(
    private waitlistService: WaitlistService,
    private restaurantAPIService: RestaurantAPIService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.restaurantId = params['id'];
      this.restaurantAPIService.getAllRestaurants().subscribe(restItems => {
        this.restaurantName = restItems[this.restaurantId - 1].name;
      })
    }
    )
  }

  ngOnInit() {
    this.getWaitlist();
    //this.avgWaitMin = this.avgWaittime(this.waitlist);
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
    if (this.restaurantId) {
      this.waitlistService.getWaitlist(this.restaurantId).subscribe(waitlistItems => {
        this.waitlist = waitlistItems;
        this.avgWaitMin = this.avgWaittime(this.waitlist);
      });
    }

  }

}