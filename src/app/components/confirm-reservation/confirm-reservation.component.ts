import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantAPIService } from 'app/_services/restaurant-api.service';
import { WaitlistService } from 'app/_services/waitlist.service';
import { Waitlist } from 'app/_models/waitlist';

@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.css']
})
export class ConfirmReservationComponent implements OnInit {

  queueID: number;
  index: number;
  restaurantId: number;
  notified: boolean;
  confirmed: boolean;
  customerName: string;
  waitlist: Waitlist[];
  restaurantName: string;

  constructor(private waitlistService: WaitlistService, private route: ActivatedRoute, private restaurantAPIService: RestaurantAPIService) {
    this.route.params.subscribe(params => {
      this.restaurantId = params['restId'];
      this.queueID = params['queueId'];
      this.restaurantAPIService.getAllRestaurants().subscribe(restItems => {
        this.restaurantName = restItems[this.restaurantId - 1].name;
      })
    }
    )
  }

  ngOnInit() {
    if(this.restaurantId) {
      this.waitlistService.getWaitlist(this.restaurantId).subscribe(waitlistItems => {
        this.waitlist = waitlistItems;
        console.log(this.waitlist);
        this.index = this.waitlist.findIndex(obj => obj.queueID == this.queueID);
        console.log(this.index, this.queueID);
        this.notified = this.waitlist[this.index].notified;
        this.confirmed = this.waitlist[this.index].confirmed;
        this.customerName = this.waitlist[this.index].customerName;
      })
  }
  }

  confirm(queueID: number) {
    console.log("confirm" + queueID);
    this.waitlistService.confirmCustomer(this.restaurantId, queueID);
    window.location.reload();
  }
}
