import { Category } from './category.model';

export class Department {
    name: string;
    description: string;
    categories: Category[];
    POSDepartmentCode: string;
    uniqueTag: string;
}