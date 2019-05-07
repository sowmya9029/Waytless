import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'app/_models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  id: number;
  private sub: any;

  private name: string;
  private appetizers: MenuItem[];
  private entrees: MenuItem[];

  constructor(private route: ActivatedRoute) {
    this.id = 0;
    this.sub = this.route.params.subscribe(params => {
      this.id += params['id'];
      
      // below should eventually be fetched from back-end server.
      if (this.id == 1) {
        this.name = "Din Tai Fung";
      } else if (this.id == 2) {
        this.name = "Olive Garden";
      } else if (this.id == 3) {
        this.name = "Southern Spice";
      } else {
        this.name = "Mediterranean Kitchen";
      }
      this.appetizers = this.getAppetizers(this.id);
      this.entrees = this.getEntrees(this.id);
    })
  }

  ngOnInit() {

  }

  private getAppetizers(id: number): MenuItem[] {
    let items: MenuItem[];
    if (id == 1) {
      const m1 = { id: 1, name: "Cucumber Salad", price: 2.31, description: "Cucumbers marinated in sauceCucumbers marinated in sauceCucumbers marinated in sauce" };
      const m2 = { id: 2, name: "Soy Noodle Salad", price: 3.31, description: "Vegetarian cold salad" };
      const m3 = { id: 3, name: "Fried Pork Chop", price: 4.31, description: "Fried pork" };
      const m4 = { id: 3, name: "Spring Rolls", price: 4.31, description: "Fried and vegetarian" };
      items = [m1, m2, m3, m4];
    } else if (id == 2) {
      const m1 = { id: 1, name: "Bread", price: 2.31, description: "fresh" };
      const m2 = { id: 2, name: "Soup", price: 3.31, description: "hot" };
      const m3 = { id: 3, name: "Rolls", price: 4.31, description: "fresh" };
      items = [m1, m2, m3];
    } else if (id == 3) {
      const m1 = { id: 1, name: "Fried chicken", price: 2.31, description: "" };
      const m2 = { id: 2, name: "Coleslaw", price: 3.31, description: "" };
      const m3 = { id: 3, name: "Mashed potatoes", price: 4.31, description: "" };
      items = [m1, m2, m3];
    } else {
      const m1 = { id: 1, name: "Olive salad", price: 2.31, description: "" };
      const m2 = { id: 2, name: "Cheese", price: 3.31, description: "" };
      const m3 = { id: 3, name: "Fish", price: 4.31, description: "Freshly caught" };
      items = [m1, m2, m3];
    }
    return items;
  }

  private getEntrees(id: number): MenuItem[] {
    let items: MenuItem[];
    if (id == 1) {
      const m1 = { id: 1, name: "Shrimp Fried Rice", price: 2.31, description: "shrimp fried in rice" };
      const m2 = { id: 2, name: "House Chicken Soup", price: 3.31, description: "Steamed soup" };
      const m3 = { id: 3, name: "Fried Pork Chop", price: 4.31, description: "Fried pork" };
      items = [m1, m2, m3];
    } else if (id == 2) {
      const m1 = { id: 1, name: "Spaghetti", price: 2.31, description: "fresh" };
      const m2 = { id: 2, name: "Lasagna", price: 3.31, description: "hot" };
      const m3 = { id: 3, name: "Pizza", price: 4.31, description: "fresh" };
      items = [m1, m2, m3];
    } else if (id == 3) {
      const m1 = { id: 1, name: "Fried chicken with rice", price: 2.31, description: "" };
      const m2 = { id: 2, name: "Combo meal", price: 3.31, description: "" };
      items = [m1, m2];
    } else {
      const m1 = { id: 1, name: "Greek salad", price: 2.31, description: "" };
      const m2 = { id: 2, name: "Olive fish wine", price: 3.31, description: "" };
      items = [m1, m2];
    }
    return items;
  }

}
