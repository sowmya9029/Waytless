export class MenuItem {
    itemID: number;
    itemName: string;
    price: number;
    description: string;
    url?: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}