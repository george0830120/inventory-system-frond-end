import { Item, ItemCondition} from './item.model'
import { Subcategory } from './subcategory.model';

export class Category {
    name: string;
    items: Item[];
    subcategories: Subcategory[];
    description: string;
    uniqueTag: string;
    hasSub:string;
    id:number;
}