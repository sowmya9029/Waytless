export class Order {
    orderId: String;
    menuItemId: number;
    quantity: number;
    orderTime: Date;
    customerId : number;
    restaurantID : number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}