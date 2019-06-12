import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/_services/api.service';
import { Order } from 'app/_models/order';
import { MenuItem } from 'app/_models/menuItem';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuApiService } from 'app/_services/menu-api.service';
import { UserService } from 'app/_services/user.service';
export interface OrderDetail {
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css']
})
export class OrderCartComponent implements OnInit {

  private orderDetails: OrderDetail[];
  private orders: Order[];
  private menuItemsMap: Map<number, MenuItem>;
  private totalPrice: number;

  private orderId;
  constructor(private apiService: ApiService,
    private menuApiService: MenuApiService,
    private router: Router,
    private userService : UserService,
    private route: ActivatedRoute) {
    this.orderId = "";
    this.menuItemsMap = new Map;
    this.orderDetails = [];
    this.totalPrice = 0;

    this.route.params.subscribe(params => {
      this.orderId += params['id'];

      this.apiService.getOrder(this.orderId).subscribe(allOrders => {
        this.orders = allOrders;

        console.log("loading: ");
        console.log(allOrders);
        console.log(allOrders[0]);
        console.log("done loading: ");

        this.menuApiService.getAllMenuItems(allOrders[0].restaurantID).subscribe(menuItems => {
          menuItems.forEach(m => this.menuItemsMap.set(m.itemID, m));
          this.orders.forEach(o => {
            this.orderDetails.push({
              name: this.menuItemsMap.get(o.menuItemId).itemName,
              price: this.menuItemsMap.get(o.menuItemId).price,
              quantity: o.quantity
            });
            this.totalPrice += o.quantity * this.menuItemsMap.get(o.menuItemId).price;
          });
        }
        );
      }
      );

    });
  }
  public logout(){
    this.userService.logoutUser();
    this.router.navigate(['']);
  }
  ngOnInit() { }

  public orderConfirm() {

  }
}
