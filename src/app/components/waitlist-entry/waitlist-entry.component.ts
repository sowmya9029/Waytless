import { Component, OnInit,Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

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
  position : number = 1
  bookingTime: Date

  constructor(@Inject(DOCUMENT) document) {
    this.document = document
   }

  ngOnInit() {
  }

  addToWaitlist() {
    console.log("Entered here!!!")
    this.show = true
    this.name =  (<HTMLInputElement>document.getElementById('name')).value;
    this.phone =  (<HTMLInputElement>document.getElementById('phone')).value;
    this.email =  (<HTMLInputElement>document.getElementById('email')).value;
    this.groupSize =  Number((<HTMLInputElement>document.getElementById('groupsize')).value);

    console.log("Name:" + this.name)

    this.bookingTime = new Date(); // for current datetime

    // populate the html elements to show
    (<HTMLInputElement>document.getElementById('bookedName')).innerHTML = this.name;
    (<HTMLInputElement>document.getElementById('queuePosition')).innerHTML = String(this.position);

    // extract the date and time seperately from the booking time.
    let date = this.bookingTime.getFullYear()+'-'+(this.bookingTime.getMonth()+1)+'-'+this.bookingTime.getDate();
    let time = this.bookingTime.getHours() + ":" + this.bookingTime.getMinutes() + ":" + this.bookingTime.getSeconds();
    
    (<HTMLInputElement>document.getElementById('addedTime')).innerHTML = date + ' ' + time;
    (<HTMLInputElement>document.getElementById('waitTime')).innerHTML = '5 mins';

  }

}
