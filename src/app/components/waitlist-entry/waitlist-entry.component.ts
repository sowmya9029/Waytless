import { Component, OnInit,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import {WaitlistService} from '../../_services/waitlist.service'

@Component({
  selector: 'app-waitlist-entry',
  templateUrl: './waitlist-entry.component.html',
  styleUrls: ['./waitlist-entry.component.css']
})
export class WaitlistEntryComponent implements OnInit {

  show : boolean = false
  document : Document
  name : string
  phone : string
  email : string
  groupSize : number
  bookingTime: Date

  constructor(@Inject(DOCUMENT) document, private waitlistservice :WaitlistService) {
    this.document = document
   }

  ngOnInit() {
  }

  showMe() : boolean{

    return this.show;
  }
  addToWaitlist() {
    var restID = 1;
    this.show = true
    this.name =  (<HTMLInputElement>document.getElementById('name')).value;
    this.phone =  (<HTMLInputElement>document.getElementById('phone')).value;
    this.email =  (<HTMLInputElement>document.getElementById('email')).value;
    this.groupSize =  Number((<HTMLInputElement>document.getElementById('group')).value);

    this.bookingTime = new Date(); // for current datetime
    var waitlistEntry = {
      "queueID" : 1,
      "customerName": this.name,
      "restaurantID": restID,
      "groupSize": this.groupSize,
      "joinTime": this.bookingTime,
      "quotedtime": new Date(this.bookingTime.getTime() + 10 * 60000),
      "email" : this.email,
      "phone" : this.phone,
      "notified": false,
      "confirmed": false
    };

    // storing into db -- COMMENTED NOW BUT WORKS!
    //this.waitlistservice.storeWaitlistEntry(waitlistEntry);
    console.log("Stored into db");
    console.log(this.show);

    // populate the html elements to show
    (<HTMLInputElement>document.getElementById('bookedName')).innerHTML = this.name;
    console.log("Name passed");
    (<HTMLInputElement>document.getElementById('groupSize')).innerHTML = String(this.groupSize);
    console.log("group passed");
    // extract the date and time seperately from the booking time.
    let date = this.bookingTime.getFullYear()+'-'+(this.bookingTime.getMonth()+1)+'-'+this.bookingTime.getDate();
    let time = this.bookingTime.getHours() + ":" + this.bookingTime.getMinutes() + ":" + this.bookingTime.getSeconds();
    
    (<HTMLInputElement>document.getElementById('addedTime')).innerHTML = date + ' ' + time;
    (<HTMLInputElement>document.getElementById('waitTime')).innerHTML = '10 mins';

  }

  public editWaitList(){

  }

  public deleteFromWaitList(){

  }

  private getCurrentWaitListSize(restId : number) : Number{

    console.log(this.waitlistservice.getWaitlist(restId));
    return 0;
  }

}
