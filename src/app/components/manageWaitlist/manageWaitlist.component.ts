import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

interface Entry {
  id: number,
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
    id: 1,
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
    id: 2,
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
    id: 3,
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

  editField: string;
  entries = ENTRIES;

  awaitingPersonList: Array<any> = [
    {
      id: 4,
      name: "Bill Gates",
      groupsize: 4,
      jointime: new Date("February 4, 2019 17:15:00"),
      quotedtime: new Date("February 4, 2019 17:25:00"),
      email : "abc@abc.com",
      phone : "2062112222",
      notified: false,
      confirmed: false
    },
    {
      id: 5,
      name: "Mary Gates",
      groupsize: 5,
      jointime: new Date("February 4, 2019 18:15:00"),
      quotedtime: new Date("February 4, 2019 18:25:00"),
      email : "abc@abc.com",
      phone : "2062112222",
      notified: false,
      confirmed: false
    }
  ];


  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.entries[id][property] = editField;
  }

  remove(id: any) {
    this.awaitingPersonList.push(this.entries[id]);
    this.entries.splice(id, 1);
  }

  add() {
    if (this.entries.length > 0) {
      this.awaitingPersonList[0][1] = this.entries.length+1;
      const person = this.awaitingPersonList[0];
      this.entries.push(person);
      this.awaitingPersonList.splice(0, 1);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}

