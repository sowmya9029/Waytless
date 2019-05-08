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
  private desserts: MenuItem[];
  private orders: Map<number, number>; // key: menuItem id, value: count

  private totalPrice: number;

  constructor(private route: ActivatedRoute) {
    this.id = 0;
    this.totalPrice = 0;
    this.sub = this.route.params.subscribe(params => {
      this.id += params['id'];
      
      // below should eventually be fetched from back-end server.
      if (this.id == 1) {
        this.name = "Din Tai Fung";
      } else if (this.id == 2) {
        this.name = "Olive Garden";
      } else if (this.id == 3) {
        this.name = "Southern Spice";
      } else if (this.id == 4) {
        this.name = "Mediterranean Kitchen";
      } else {
        this.name = "PF Chang's";
      }
      this.appetizers = this.getAppetizers(this.id);
      this.entrees = this.getEntrees(this.id);
      this.desserts = this.getDesserts(this.id);
      this.orders = new Map();
    })
  }

  ngOnInit() {

  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  private addToCart(item: MenuItem) {
    if (this.orders.get(item.id) === undefined) {
      this.orders.set(item.id, 1);
    } else {
      this.orders.set(item.id, this.orders.get(item.id) + 1);
    }
    this.totalPrice = Number.parseFloat((this.totalPrice + item.price).toFixed(2));
  }

  private deleteFromCart(item: MenuItem) {
    let val = this.orders.get(item.id);
    if (val !== undefined && val > 0) {
      this.orders.set(item.id, this.orders.get(item.id) - 1);
      this.totalPrice = Number.parseFloat((this.totalPrice - item.price).toFixed(2));
    }
  }

  private getAppetizers(id: number): MenuItem[] {
    let items: MenuItem[];
    if (id == 1) {
      const m1 = { id: 1, name: "Cucumber Salad", price: 4, description: "Cucumbers marinated in sauce",
                    url: "https://dintaifungusa.com/wp-content/uploads/2014/05/DTF_MenuIcons_cucumber.jpg" };
      const m2 = { id: 2, name: "Soy Noodle Salad", price: 3, description: "Vegetarian cold salad",
                    url: "https://dintaifungusa.com/wp-content/uploads/2014/05/DTF_MenuIcons_soynoodlesalad.jpg" };
      const m3 = { id: 3, name: "Fried Pork Chop", price: 4, description: "Fried pork",
                    url: "https://dintaifungusa.com/wp-content/uploads/2014/05/DTF_MenuIcons_porkchop.jpg" };
      const m4 = { id: 4, name: "Seaweed Salad", price: 4, description: "Seaweed and bean curd in a vinegar dressing",
                    url: "https://dintaifungusa.com/wp-content/uploads/2014/05/DTF_MenuIcons_seaweedsalad.jpg" };
      items = [m1, m2, m3, m4];
    } else if (id == 2) {
      const m1 = { id: 5, name: "Bread", price: 2.31, description: "Freshly toasted" };
      const m2 = { id: 6, name: "Soup", price: 3.31, description: "Hot and spicy" };
      const m3 = { id: 7, name: "Rolls", price: 4.31, description: "Freshly baked" };
      items = [m1, m2, m3];
    } else if (id == 3) {
      const m1 = { id: 8, name: "Fried chicken", price: 2.31, description: "Comfort food for any time of day" };
      const m2 = { id: 9, name: "Coleslaw", price: 3.31, description: "Tasty appetizer to go with your meal" };
      const m3 = { id: 10, name: "Mashed potatoes", price: 4.31, description: "Savory potatoes as a staple food" };
      items = [m1, m2, m3];
    } else{
      const m1 = { id: 11, name: "Olive salad", price: 2.31, description: "Olives mixed with lettuce and dressing" };
      const m2 = { id: 12, name: "Cheese", price: 3.31, description: "A healthy cheese with lots of calcium" };
      const m3 = { id: 13, name: "Fish", price: 4.31, description: "Fresh from the sea" };
      items = [m1, m2, m3];
    } 
    return items;
  }

  private getEntrees(id: number): MenuItem[] {
    let items: MenuItem[];
    if (id == 1) {
      const m1 = { id: 1, name: "Shrimp Fried Rice", price: 3, description: "Shrimp and vegetables fried with rice",
                   url: "https://dintaifungusa.com/wp-content/uploads/2015/01/shrimp-fried-rice.jpg" };
      const m2 = { id: 2, name: "House Chicken Soup", price: 3, description: "Hot soup perfect for cold weather",
                   url: "https://dintaifungusa.com/wp-content/uploads/2015/01/house-chicken-noodle-soup.jpg" };
      const m3 = { id: 3, name: "Pork Chop Noodle Soup", price: 3, description: "Pork broth with pork meat and noodles",
                   url: "https://dintaifungusa.com/wp-content/uploads/2015/01/pork-chop-noodle-soup.jpg" };
      items = [m1, m2, m3];
    } else if (id == 2) {
      const m1 = { id: 4, name: "Spaghetti", price: 2, description: "Italian style dinner with tomato sauce" };
      const m2 = { id: 5, name: "Lasagna", price: 3, description: "Baked lasagna fresh from the oven" };
      const m3 = { id: 6, name: "Pizza", price: 4, description: "Classic staple of a quick and tasty dinner" };
      items = [m1, m2, m3];
    } else if (id == 3) {
      const m1 = { id: 7, name: "Fried chicken with rice", price: 2, description: "Fried and toasted chicken served with a side of rice" };
      const m2 = { id: 8, name: "Combo meal", price: 3, description: "A soft drink along with fried chicken and rice" };
      items = [m1, m2];
    } else {
      const m1 = { id: 9, name: "Greek salad", price: 3, description: "Greek style salad with olives and lettuce" };
      const m2 = { id: 10, name: "Olive fish", price: 4, description: "Olives served with fish on the side" };
      items = [m1, m2];
    }
    return items;
  }

  private getDesserts(id: number): MenuItem[] {
    let items: MenuItem[];
    if (id == 1) {
      const m1 = { id: 1, name: "Red Bean XiaoLongBao", price: 3, description: "Red beans, Chinese rock sugar, tapioca pearls and wheat flour",
                   url: "https://dintaifungusa.com/wp-content/uploads/2019/01/RedBeanXLB_frame.jpg" };
      const m2 = { id: 2, name: "Taro Bun", price: 3, description: "creamy,smooth taro custard filling",
                   url: "https://dintaifungusa.com/wp-content/uploads/2019/01/SweetTaroXLB_frame.jpg" };
      const m3 = { id: 3, name: "Eight-Treasure Sticky Rice", price: 4, description: "Combination of dried red dates, lotus seeds, candied plums, nuts",
                   url: "https://dintaifungusa.com/wp-content/uploads/2019/01/Eight-Treasure-Sticky-Rice.jpg" };
      items = [m1, m2, m3];
    } else if (id == 2) {
      const m1 = { id: 4, name: "Baklava", price: 2, description: "Walnuts and cinnamon between dough with melted butter and sugar" };
      const m2 = { id: 5, name: "Tiramisu", price: 3, description: "Baked lasagna fresh from the oven" };
      const m3 = { id: 6, name: "Greek Yogurt", price: 4, description: "Classic staple of a quick and tasty dinner" };
      items = [m1, m2, m3];
    } else if (id == 3) {
      const m1 = { id: 7, name: "Honey", price: 2, description: "Fried and toasted chicken served with a side of rice" };
      const m2 = { id: 8, name: "Lemon olive oil cake", price: 3, description: "A soft drink along with fried chicken and rice" };
      items = [m1, m2];
    } else {
      const m1 = { id: 9, name: "Strawberry Yogurt", price: 3, description: "Greek style salad with olives and lettuce" };
      const m2 = { id: 10, name: "Cheese Cake", price: 4, description: "Olives served with fish on the side" };
      items = [m1, m2];
    }
    return items;
  }
}
