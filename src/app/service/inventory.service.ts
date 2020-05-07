import { Department, Category, Subcategory } from "../model/index";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs"; 
 
@Injectable({
  providedIn: "root"
})
export class InventoryService {
  public departments: BehaviorSubject<Department[]>;
  constructor() {
    this.departments = new BehaviorSubject<Department[]>(null);
    var departmentsArray: Department[];
    departmentsArray = [];
    // (dummyTestData.Deaprtments).forEach(dep => departmentsArray.push(dep));
    this.departments.next(departmentsArray);
    console.log(this.departments) 
  }

  getDepartments() {
    return this.departments;
  }

  getDepartmentByName(DepName: string) {
    var dep: Department;

    this.departments.subscribe(val=>dep = val.find(d=>d.name===DepName));
    return dep;
  }

  getCategoryByName(DepName: string, CatName:string){
    var dep = this.getDepartmentByName(DepName);
    var cat: Category;
    cat = dep.categories.find(cat => cat.name===CatName); 
    return cat;
  }

  getSubCategoryByName(departmentName: string, categoryName:string, subcategoryName:string) {
    let category = this.getCategoryByName(departmentName,categoryName);
    let subCategory : Subcategory;
    console.log(categoryName);
    subCategory = category.subcategories.find(sub => sub.name === subcategoryName);
    return subCategory;
  }
}
