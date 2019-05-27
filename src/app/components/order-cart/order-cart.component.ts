import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/_services/api.service';
import { Order } from 'app/_models/order';
import { MenuItem } from 'app/_models/menuItem';
import { Router, ActivatedRoute } from '@angular/router';

export interface OrderDetail {
  name: string;
  price: number;
  quantity : number;
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

  private customerNumber;
  private restaurantID;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute) { 
    this.customerNumber = 2;
    this.restaurantID = 0;
    this.menuItemsMap = new Map;
    this.orderDetails = [];
    this.totalPrice = 0;

    this.route.params.subscribe(params => {
      this.restaurantID += params['id'];

      this.apiService.getAllMenuItems(this.restaurantID).subscribe(menuItems => {
          menuItems.forEach(m => this.menuItemsMap.set(m.itemID, m));
          this.apiService.getAllOrders(this.restaurantID, this.customerNumber).subscribe(allOrders => {
              this.orders = allOrders;
              this.orders.forEach(o => {
                this.totalPrice += o.quantity * this.menuItemsMap.get(o.menuItemId).price;
                this.orderDetails.push({
                  name: this.menuItemsMap.get(o.menuItemId).itemName,
                  price: this.menuItemsMap.get(o.menuItemId).price,
                  quantity: o.quantity
                });
              });
            }
          );
        }
      );
    });
  }

  ngOnInit() { }

  public orderConfirm() {

  }
}
