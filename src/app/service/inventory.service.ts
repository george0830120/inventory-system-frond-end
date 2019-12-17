import { Department, Category, Subcategory, Item } from "../model/index";
import { dummyTestData } from "../testData-Inventory";
import { of, from, Observable, pipe } from "rxjs";
import { filter } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs"; 
 
@Injectable({
  providedIn: "root"
})
export class InventoryService {
  private departments: BehaviorSubject<Department[]>;
  constructor() {
    this.departments = new BehaviorSubject<Department[]>(null);
    var departmentsArray: Department[];
    departmentsArray = [];
    (dummyTestData.Deaprtments).forEach(dep => departmentsArray.push(dep));
    this.departments.next(departmentsArray);
    console.log(this.departments) 
  }

  getDepartments() {
    return this.departments;
  }

  getDepartmentByName(DepName: string) {
    var dep: Department[];
    dep = [];
    this.departments.subscribe(val=>val.filter(d=>d.name===DepName).forEach(d=>dep.push(d)));
    return dep;
  }

  getCategoryByName(DepName: string, CatName:string){
    var dep = this.getDepartmentByName(DepName);
    var cat: Category[];
    dep = dep.filter(dep => dep.name===DepName);
    dep.forEach(dep => cat = dep.categories.filter(cat => cat.name===CatName))
    return cat;
  }
}
