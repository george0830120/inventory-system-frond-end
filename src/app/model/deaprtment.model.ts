import { Category } from './category.model';

export class Department {
    id: string;
    name: string;
    description: string;
    categories: Category[];
    POSDepartmentCode: string;
    uniqueTag: string;
}
