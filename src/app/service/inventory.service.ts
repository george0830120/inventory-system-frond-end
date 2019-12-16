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

  getDepartments(): any {
    return this.departments;
  }

  getDepartmentByName(DepName: string) {
    return this.departments.pipe(
      filter(department => department.name === DepName)
    );
  }

  getCategoryByName(DepName: string, CatName:string){
    var dep = this.getDepartmentByName(DepName)
    var cat: Observable<Category>;
    dep.subscribe(val=>{
        cat = from(val.categories.filter(category=>category.name===CatName));
    })
    return cat;
  }
}
