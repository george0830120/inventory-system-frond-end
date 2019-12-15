import {Item, ItemCondition} from './item.model'

export class Subcategory {
    name: string;
    items: Item[];
    description: string;
    uniqueTag: string;
}