import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WaitlistService } from '../../_services/waitlist.service';
import { RestaurantAPIService } from '../../_services/restaurant-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/_services/user.service';

@Component({
  selector: 'app-waitlist-entry',
  templateUrl: './waitlist-entry.component.html',
  styleUrls: ['./waitlist-entry.component.css']
})
export class WaitlistEntryComponent implements OnInit {

  show: boolean = false
  restaurantId: number
  restaurantName: string
  queueID: number
  document: Document
  name: string
  phone: string
  email: string
  groupSize: number
  bookingTime: Date

  waitTime: string
  addedTime: string

  constructor(@Inject(DOCUMENT) document,
    private userService: UserService,
    private router: Router,
    
    private waitlistservice: WaitlistService,
    private restaurantSerice: RestaurantAPIService,
    private route: ActivatedRoute) {
    this.document = document;
    this.route.params.subscribe(params => {
      this.restaurantId = params['id'];
      this.restaurantSerice.getAllRestaurants().subscribe(restItems => {
        this.restaurantName = restItems[this.restaurantId - 1].name;
      });

      this.userService.getCurrentUsersEmail().subscribe(userEmail => {
        this.waitlistservice.getWaitlist(this.restaurantId).subscribe(waitlistItems => {
          for (let i = 0; i < waitlistItems.length; i++) {
            if (waitlistItems[i].email === userEmail) {
              this.show = true;
              this.name = waitlistItems[i].customerName;
              this.phone = waitlistItems[i].phone;
              this.email = waitlistItems[i].email;
              this.groupSize = waitlistItems[i].groupSize;
              this.bookingTime = new Date(waitlistItems[i].joinTime);

              this.queueID = this.hashCode(this.email);
              this.displayTime();
              break;
            }
          }
        });
      });
    });
  }

  ngOnInit() { }

  addToWaitlist(restID: number) {
    this.show = true;
    this.name = (<HTMLInputElement>document.getElementById('name')).value;
    this.phone = (<HTMLInputElement>document.getElementById('phone')).value;
    this.email = (<HTMLInputElement>document.getElementById('email')).value;
    this.groupSize = Number((<HTMLInputElement>document.getElementById('group')).value);

    this.bookingTime = new Date(); // for current datetime
    this.queueID = this.hashCode(this.email);
    console.log("Queue in add:" + this.hashCode(this.email));

    var waitlistEntry = {
      "queueID": this.queueID,
      "customerName": this.name,
      "restaurantID": restID,
      "groupSize": this.groupSize,
      "joinTime": this.bookingTime,
      "quotedtime": new Date(this.bookingTime.getTime() + 10 * 60000),
      "email": this.email,
      "phone": this.phone,
      "notified": false,
      "confirmed": false,
      "completed": false
    };

    // storing into db 
    this.waitlistservice.storeWaitlistEntry(waitlistEntry);
    this.displayTime();
    $(':input').val('');
  }

  private displayTime() {
    // extract the date and time seperately from the booking time.
    let date = this.bookingTime.getFullYear() + '-' + (this.bookingTime.getMonth() + 1) + '-' + this.bookingTime.getDate();
    let time = this.bookingTime.getHours() + ":" + this.bookingTime.getMinutes() + ":" + this.bookingTime.getSeconds();
    this.addedTime = date + ' ' + time;
    this.waitTime = String((this.queueID - 1) % 60) + ' mins';
  }

  public editWaitList(resId: number, queueID: number) {
    console.log("Queue in edit:" + queueID);
    var newgroup = $('#newGroup').val();

    var tobeChanged = Number(newgroup);
    this.groupSize = tobeChanged;
    this.waitlistservice.updateGroupSize(resId, queueID, tobeChanged);
  }

  public deleteFromWaitList(resId: number, queueID: number) {
    console.log("Queue in delete:" + queueID);
    this.waitlistservice.removeReservation(resId, queueID);
    this.show = false;
  }

  hashCode(str: string) {
    var hash = 0;
    var i: number;
    var chr: any;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    if (hash < 0) hash = hash * -1;
    return hash;
  }

  public logout(){
    this.userService.logoutUser();
    this.router.navigate(['']);
  }

  
}
