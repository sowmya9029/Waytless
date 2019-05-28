import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { RestaurantAPIService } from 'app/_services/restaurant-api.service';
import { ApiService } from 'app/_services/api.service';
import { Restaurant } from 'app/_models/restaurant';
import { Waitlist } from 'app/_models/waitlist';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


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
  avgWaitMin: number;

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

  avgWaittime(wl : Waitlist[]): number{
    var sum = 0;
    wl.forEach(element => {
        var eventStartTime = new Date(element.quotedtime);
        var eventEndTime = new Date(element.joinTime);
        var diff = eventEndTime.valueOf() - eventStartTime.valueOf();
        var diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);
        sum += diffMins;
    });
    console.log("sum" + sum);
    console.log("avg "+ sum / wl.length);
    return Math.abs(Math.round((sum / wl.length)));
  }

  constructor(
    private router: Router,
    private apiService: ApiService,
    private restaurantAPIService: RestaurantAPIService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.restaurantId = params['id'];
        this.restaurantAPIService.getAllRestaurants().subscribe(restItems => {
          this.restaurantName = restItems[this.restaurantId].name;
        })
        this.apiService.getWaitlist(this.restaurantId).subscribe(waitlistItems => {
          this.waitlist = waitlistItems;
          this.avgWaitMin = this.avgWaittime(this.waitlist);
        })
      }
      )}

  ngOnInit() {
    
  }
  ngOnChanges() {
    
  }

}

