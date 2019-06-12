import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'app/_models';
import { ApiService } from 'app/_services/api.service';
import { Order } from 'app/_models/order';
import { MenuApiService } from 'app/_services/menu-api.service';
import { RestaurantAPIService } from '../../_services/restaurant-api.service';
import * as uuid from 'uuid';
import { forkJoin } from 'rxjs';
import { UserService } from 'app/_services/user.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  restaurantID: number;
  customerNumber: number;
  private sub: any;

  private restaurantName: string;
  private appetizers: MenuItem[];
  private entrees: MenuItem[];
  private desserts: MenuItem[];
  private orders: Map<number, number>; // key: menuItem id, value: count

  private totalPrice: number;

  private loginUser: string;

  constructor(
    private router: Router,
    private userService : UserService,
    private apiService: ApiService,
    private menuApiService: MenuApiService,
    private restaurantService: RestaurantAPIService,
    private route: ActivatedRoute) {
    this.restaurantID = 0;
    this.totalPrice = 0;
    this.customerNumber = 2;
    this.sub = this.route.params.subscribe(params => {
      this.restaurantID += params['id'];
      this.restaurantService.getAllRestaurants().subscribe(restItems => {
        this.restaurantName = restItems[this.restaurantID - 1].name;
      });

      this.userService.getCurrentUsersEmail().subscribe(email => {
        this.loginUser = email;
      });

      this.menuApiService.getAllMenuItems(this.restaurantID).subscribe(menuItems => {
        this.appetizers = menuItems.filter(i => i.itemCategory.categoryId == 1);
        this.entrees = menuItems.filter(i => i.itemCategory.categoryId == 2);
        this.desserts = menuItems.filter(i => i.itemCategory.categoryId == 3);
      });
      this.orders = new Map();
    })
  }

  ngOnInit() {

  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  private addToCart(item: MenuItem) {
    console.log('adding for: ' + item.itemID);
    if (this.orders.get(item.itemID) === undefined) {
      this.orders.set(item.itemID, 1);
    } else {
      this.orders.set(item.itemID, this.orders.get(item.itemID) + 1);
    }
    this.totalPrice = Number.parseFloat((this.totalPrice + item.price).toFixed(2));
  }

  private deleteFromCart(item: MenuItem) {
    console.log('removing for: ' + item.itemID);
    let count = this.orders.get(item.itemID);
    if (count !== undefined) {
      let newCount = count - 1;
      if (newCount == 0) {
        this.orders.delete(item.itemID);
      } else {
        this.orders.set(item.itemID, newCount);
        this.totalPrice = Number.parseFloat((this.totalPrice - item.price).toFixed(2));
      }
    }
  }
  public logout(){
    this.userService.logoutUser();
    this.router.navigate(['']);
  }
  private makeOrder() {
    let confirmedOrders = [];
    let m = this.orders;
    let orderId = uuid.v4();
    console.log('make orders! ' + orderId);
    m.forEach((k, v, m) => {
      console.log(`key:${k} value:${v} map:${m}`);
      confirmedOrders.push({
        orderId: orderId,
        menuItemId: v,
        quantity: k,
        orderTime: new Date(),
        customerId: this.loginUser,
        restaurantID: this.restaurantID
      });
    })
    var responses = this.apiService.makeOrders(confirmedOrders);
    console.log('done posting orders!');
    forkJoin(responses).subscribe(r => {
      this.router.navigate([`/order-cart/` + orderId]);
    });
  }
}
