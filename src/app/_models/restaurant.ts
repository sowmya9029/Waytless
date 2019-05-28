export class Restaurant {
    restaurantID: number;
    name: string;
    address: {street: string, number: string, zip: string, city: string};
    phoneNumber: number;
    email:string;
    cuisine:string;
    reviews:number;
    booked:number;
    url:string;
    rating: number;
}