import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

interface Entry {
  name: string;
  groupsize: number;
  email: string;
  phone: string;
  jointime: Date;
  quotedtime: Date;
  notified: boolean;
  confirmed: boolean;
}

const ENTRIES: Entry[] = [
  {
    name: "Mary",
    groupsize: 3,
    jointime: new Date("February 4, 2019 16:00:00"),
    quotedtime: new Date("February 4, 2019 16:10:00"),
    email : "abc@abc.com",
    phone : "2062112222",
    notified: true,
    confirmed: true
  },
  {
    name: "John",
    groupsize: 2,
    jointime: new Date("February 4, 2019 16:10:00"),
    quotedtime: new Date("February 4, 2019 16:20:00"),
    email : "abc@abc.com",
    phone : "2062112222",
    notified: true,
    confirmed: true
  },
  {
    name: "Austin",
    groupsize: 3,
    jointime: new Date("February 4, 2019 16:15:00"),
    quotedtime: new Date("February 4, 2019 16:25:00"),
    email : "abc@abc.com",
    phone : "2062112222",
    notified: true,
    confirmed: true
  }
];

@Component({
  selector: 'app-manageWaitlist',
  templateUrl: './manageWaitlist.component.html',
  styleUrls: ['./manageWaitlist.component.css']
})

export class manageWaitlistComponent implements OnInit {

  entries = ENTRIES;

  constructor() { }

  ngOnInit() {
  }

}

