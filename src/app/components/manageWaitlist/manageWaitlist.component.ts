import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Restaurant } from 'app/_models/restaurant';
import { Waitlist } from 'app/_models/waitlist';

@Component({
  selector: 'app-manageWaitlist',
  templateUrl: './manageWaitlist.component.html',
  styleUrls: ['./manageWaitlist.component.css']
})

export class manageWaitlistComponent implements OnInit {

  editField: string;
  restaurantId: number;
  restaurantName: string;
  waitlist: Waitlist[];

  notify(queueID: number) {
    console.log("notify" + queueID);
    this.apiService.notifyCustomer(this.restaurantId, queueID);
    window.location.reload();
  }

  confirm(queueID: number) {
    console.log("confirm" + queueID);
    this.apiService.confirmCustomer(this.restaurantId, queueID);
    window.location.reload();
  }

  remove(queueID: number) {
    console.log("remove" + queueID);
    this.apiService.removeReservation(this.restaurantId, queueID);
    window.location.reload();
  }

  refreshTable(queueID: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  updateGroupSize(queueID: number, property: string, event: any) {
    console.log("updating group size" + queueID);
    const editField = event.target.textContent;
    this.apiService.updateGroupSize(this.restaurantId, queueID, editField);
  }

  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.restaurantId = params['id'];
        this.apiService.getAllRestaurants().subscribe(restItems => {
          this.restaurantName = restItems[this.restaurantId].name;
        })
        this.apiService.getWaitlist(this.restaurantId).subscribe(waitlistItems => {
          this.waitlist = waitlistItems;
        })
      }
      )}

  ngOnInit() {

  }

}

