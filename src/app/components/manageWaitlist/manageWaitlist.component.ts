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

  private waitlist: Waitlist[];

/*
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
*/

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

