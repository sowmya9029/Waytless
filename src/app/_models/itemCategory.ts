export class ItemCategory {
    categoryId: number;
    categoryName: string;
    description: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}