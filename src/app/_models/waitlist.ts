import { Time } from "@angular/common";

export class Waitlist {
    queueID: number;
    customerName: string;
    restaurantID: number;
    groupSize: number;
    joinTime: Date;
    quotedtime: Date;
    email: string;
    phone: string;
    notified: boolean;
    confirmed: boolean;
}

