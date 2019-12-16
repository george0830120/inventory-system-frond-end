import { Department, Category, Subcategory, Item } from "../model/index";
import { dummyTestData } from "../testData-Inventory";
import { of, from, Observable, pipe } from "rxjs";
import { filter } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class InventoryService {
  private departments: Observable<Department>;
  constructor() {
    this.departments = from(dummyTestData.Deaprtments);
  }

  getDepartments() {
    return this.departments;
  }

  getDepartmentByName(DepName: string) {
    var dep: Department[];
    dep = [];
    this.departments.pipe(
      filter(department => department.name === DepName),
    ).subscribe(val=>dep.push(val));
    return dep;
  }

  getCategoryByName(DepName: string, CatName:string){
    var dep = this.getDepartmentByName(DepName);
    var cat: Category[];
    dep = dep.filter(dep => dep.name===DepName);
    dep.forEach(dep => cat = dep.categories.filter(cat => cat.name===CatName))
    return cat;
  }

  getSubCategoryByName(departmentName: string, categoryName:string, subcategoryName:string) {
    let category = this.getCategoryByName(departmentName,categoryName);
    let subCategories : Subcategory[];
    console.log(categoryName);
    category.forEach(category =>  subCategories = category.subcategories.filter(sub => sub.name === subcategoryName));
    return subCategories;
  }
}
