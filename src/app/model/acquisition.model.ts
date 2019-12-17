import { Item } from './item.model';
export class Acquisition  {
    id : string;
    type: number;
    donor: string;
    contact: string;
    phone: string;
    date: Date;
    status: number;
    itmes: Item[];
}