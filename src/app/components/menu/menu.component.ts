import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'app/_models';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  restaurantID: number;
  private sub: any;

  private restaurantName: string;
  private appetizers: MenuItem[];
  private entrees: MenuItem[];
  private desserts: MenuItem[];
  private orders: Map<number, number>; // key: menuItem id, value: count

  private totalPrice: number;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute) {
    this.restaurantID = 0;
    this.totalPrice = 0;
    this.sub = this.route.params.subscribe(params => {
      this.restaurantID += params['id'];
      
      // below should eventually be fetched from back-end server.
      if (this.restaurantID == 1) {
        this.restaurantName = "Din Tai Fung";
      } else if (this.restaurantID == 2) {
        this.restaurantName = "Olive Garden";
      } else if (this.restaurantID == 3) {
        this.restaurantName = "Southern Spice";
      } else if (this.restaurantID == 4) {
        this.restaurantName = "Mediterranean Kitchen";
      } else {
        this.restaurantName = "PF Chang's";
      }
      // this.appetizers = this.getAppetizers(this.restaurantID);
      this.apiService.getAllMenuItems(this.restaurantID).subscribe(menuItems => {
        this.appetizers = menuItems;
      });
      this.entrees = this.getEntrees(this.restaurantID);
      this.desserts = this.getDesserts(this.restaurantID);
      this.orders = new Map();
    })
  }

  ngOnInit() {

  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  private addToCart(item: MenuItem) {
    if (this.orders.get(item.itemID) === undefined) {
      this.orders.set(item.itemID, 1);
    } else {
      this.orders.set(item.itemID, this.orders.get(item.itemID) + 1);
    }
    this.totalPrice = Number.parseFloat((this.totalPrice + item.price).toFixed(2));
  }

  private deleteFromCart(item: MenuItem) {
    let val = this.orders.get(item.itemID);
    if (val !== undefined && val > 0) {
      this.orders.set(item.itemID, this.orders.get(item.itemID) - 1);
      this.totalPrice = Number.parseFloat((this.totalPrice - item.price).toFixed(2));
    }
  }
  
  private getEntrees(itemID: number): MenuItem[] {
    let items: MenuItem[];
    if (itemID == 1) {
      const m1 = { itemID: 1, itemName: "Shrimp Fried Rice", price: 3, description: "Shrimp and vegetables fried with rice",
                   url: "https://dintaifungusa.com/wp-content/uploads/2015/01/shrimp-fried-rice.jpg" };
      const m2 = { itemID: 2, itemName: "House Chicken Soup", price: 3, description: "Hot soup perfect for cold weather",
                   url: "https://dintaifungusa.com/wp-content/uploads/2015/01/house-chicken-noodle-soup.jpg" };
      const m3 = { itemID: 3, itemName: "Pork Chop Noodle Soup", price: 3, description: "Pork broth with pork meat and noodles",
                   url: "https://dintaifungusa.com/wp-content/uploads/2015/01/pork-chop-noodle-soup.jpg" };
      items = [m1, m2, m3];
    } else if (itemID == 2) {
      const m1 = { itemID: 4, itemName: "Spaghetti", price: 2, description: "Italian style dinner with tomato sauce" };
      const m2 = { itemID: 5, itemName: "Lasagna", price: 3, description: "Baked lasagna fresh from the oven" };
      const m3 = { itemID: 6, itemName: "Pizza", price: 4, description: "Classic staple of a quick and tasty dinner" };
      items = [m1, m2, m3];
    } else if (itemID == 3) {
      const m1 = { itemID: 7, itemName: "Fried chicken with rice", price: 2, description: "Fried and toasted chicken served with a side of rice" };
      const m2 = { itemID: 8, itemName: "Combo meal", price: 3, description: "A soft drink along with fried chicken and rice" };
      items = [m1, m2];
    } else {
      const m1 = { itemID: 9, itemName: "Greek salad", price: 3, description: "Greek style salad with olives and lettuce" };
      const m2 = { itemID: 10, itemName: "Olive fish", price: 4, description: "Olives served with fish on the side" };
      items = [m1, m2];
    }
    return items;
  }

  private getDesserts(itemID: number): MenuItem[] {
    let items: MenuItem[];
    if (itemID == 1) {
      const m1 = { itemID: 1, itemName: "Red Bean XiaoLongBao", price: 3, description: "Red beans, Chinese rock sugar, tapioca pearls and wheat flour",
                   url: "https://dintaifungusa.com/wp-content/uploads/2019/01/RedBeanXLB_frame.jpg" };
      const m2 = { itemID: 2, itemName: "Taro Bun", price: 3, description: "creamy,smooth taro custard filling",
                   url: "https://dintaifungusa.com/wp-content/uploads/2019/01/SweetTaroXLB_frame.jpg" };
      const m3 = { itemID: 3, itemName: "Eight-Treasure Sticky Rice", price: 4, description: "Combination of dried red dates, lotus seeds, candied plums, nuts",
                   url: "https://dintaifungusa.com/wp-content/uploads/2019/01/Eight-Treasure-Sticky-Rice.jpg" };
      items = [m1, m2, m3];
    } else if (itemID == 2) {
      const m1 = { itemID: 4, itemName: "Baklava", price: 2, description: "Walnuts and cinnamon between dough with melted butter and sugar" };
      const m2 = { itemID: 5, itemName: "Tiramisu", price: 3, description: "Baked lasagna fresh from the oven" };
      const m3 = { itemID: 6, itemName: "Greek Yogurt", price: 4, description: "Classic staple of a quick and tasty dinner" };
      items = [m1, m2, m3];
    } else if (itemID == 3) {
      const m1 = { itemID: 7, itemName: "Honey", price: 2, description: "Fried and toasted chicken served with a side of rice" };
      const m2 = { itemID: 8, itemName: "Lemon olive oil cake", price: 3, description: "A soft drink along with fried chicken and rice" };
      items = [m1, m2];
    } else {
      const m1 = { itemID: 9, itemName: "Strawberry Yogurt", price: 3, description: "Greek style salad with olives and lettuce" };
      const m2 = { itemID: 10, itemName: "Cheese Cake", price: 4, description: "Olives served with fish on the side" };
      items = [m1, m2];
    }
    return items;
  }
}
