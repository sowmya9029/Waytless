import { Component, OnInit } from '@angular/core';

export interface OrderDetail {
  name: string;
  price: string;
  quantity : number;
}

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css']
})
export class OrderCartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  orders: OrderDetail[] = [
    {
      name : 'Veg burrito',
      price : '$10',
      quantity : 1
    },{
      name : 'Chips & Salsa',
      price : '$4',
      quantity : 1
    },{
      name : 'Ceaser salad',
      price : '$9',
      quantity : 1
    },
    {
      name : 'Veggie taco',
      price : '$10',
      quantity : 2
    }
  ];

}
