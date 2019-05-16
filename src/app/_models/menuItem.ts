import { ItemCategory } from "./itemCategory";

export class MenuItem {
    itemID: number;
    itemName: string;
    price: number;
    description: string;
    url?: string;
    itemCategory: ItemCategory;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}