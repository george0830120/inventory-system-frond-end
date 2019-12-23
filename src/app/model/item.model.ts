export class Item {
    name: string;
    department: string;
    category: string;
    description: string;
    condition: number;
    id: string;
    price: number;
    quantity: number;
}

export enum ItemCondition {
    Broken = 0,
    Bad = 1,
    Average = 2,
    Good = 3,
    New = 4
}
