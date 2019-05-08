import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  orders: OrderDetail[] = [
    {
      name : 'Cucumber Salad',
      price : 2.31,
      quantity : 1
    },{
      name : 'Spring rolls',
      price : 4.31,
      quantity : 1
    },{
      name : 'Mashed potatoes',
      price : 4.31,
      quantity : 1
    },
    {
      name : 'Spaghetti',
      price : 2.31,
      quantity : 2
    }
  ];

}
