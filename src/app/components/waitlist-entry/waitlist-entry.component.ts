import { Component, OnInit,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import {WaitlistService} from '../../_services/waitlist.service';
import {RestaurantAPIService} from '../../_services/restaurant-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-waitlist-entry',
  templateUrl: './waitlist-entry.component.html',
  styleUrls: ['./waitlist-entry.component.css']
})
export class WaitlistEntryComponent implements OnInit {

  show : boolean = false
  restaurantId : number
  restaurantName : string
  queueID : number
  document : Document
  name : string
  phone : string
  email : string
  groupSize : number
  bookingTime: Date

  constructor(@Inject(DOCUMENT) document, private waitlistservice :WaitlistService, 
  private restaurantSerice: RestaurantAPIService,
  private route: ActivatedRoute) {
    this.document = document
    this.route.params.subscribe(params => {
      this.restaurantId = params['id'];
      this.restaurantSerice.getAllRestaurants().subscribe(restItems => {
        this.restaurantName = restItems[this.restaurantId - 1].name;
      })

      this.waitlistservice.getWaitlist(this.restaurantId).subscribe(waitlistItems => {
        var count = Object.keys(waitlistItems).length;
         console.log(count.valueOf());
         this.queueID = count.valueOf() + 1;
         console.log(this.queueID);
         return count;
      });
      
   });
  }

  ngOnInit() {
  }

  addToWaitlist(restID:number) {
    this.show = true
    this.name =  (<HTMLInputElement>document.getElementById('name')).value;
    this.phone =  (<HTMLInputElement>document.getElementById('phone')).value;
    this.email =  (<HTMLInputElement>document.getElementById('email')).value;
    this.groupSize =  Number((<HTMLInputElement>document.getElementById('group')).value);

    this.bookingTime = new Date(); // for current datetime

    console.log("Queue in add:" + this.queueID);
    
    var waitlistEntry = {
      "queueID" : this.queueID,
      "customerName": this.name,
      "restaurantID": restID,
      "groupSize": this.groupSize,
      "joinTime": this.bookingTime,
      "quotedtime": new Date(this.bookingTime.getTime() + 10 * 60000),
      "email" : this.email,
      "phone" : this.phone,
      "notified": false,
      "confirmed": false,
      "completed" : false
    };

    
    // storing into db 
    this.waitlistservice.storeWaitlistEntry(waitlistEntry);
    
    // extract the date and time seperately from the booking time.
    let date = this.bookingTime.getFullYear()+'-'+(this.bookingTime.getMonth()+1)+'-'+this.bookingTime.getDate();
    let time = this.bookingTime.getHours() + ":" + this.bookingTime.getMinutes() + ":" + this.bookingTime.getSeconds();
    
    (<HTMLInputElement>document.getElementById('addedTime')).innerHTML = date + ' ' + time;
    (<HTMLInputElement>document.getElementById('waitTime')).innerHTML =  String((this.queueID-1) * 5) + 'mins';

    $(':input').val('');
  }

  public editWaitList(resId:number,queueID:number){
    console.log("Queue in edit:" + queueID);
    var newgroup = $('#newGroup').val();
    
    var tobeChanged = Number(newgroup);
    this.groupSize = tobeChanged;
    this.waitlistservice.updateGroupSize(resId,queueID,tobeChanged);   
  }

  public deleteFromWaitList(resId:number,queueID:number){
    console.log("Queue in delete:" + queueID);
    this.waitlistservice.removeReservation(resId,queueID);
    this.show = false;
    
  }
}
