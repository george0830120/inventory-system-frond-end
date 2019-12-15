import { Department, Category, Subcategory, Item } from '../model/index';
import { dummyTestData } from '../testData-Inventory';
import { of, from, Observable, pipe } from 'rxjs'
import { filter } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class InventoryService {
    private departments: Observable<Department>;
    private departmentsTemp: Department;
    constructor(){
        this.departments = from(dummyTestData.Deaprtments);
    }

    getDepartments(): any{
        return this.departments;
    }


    //  getDepartmentByName(name:string){
    //      return this.departments.pipe
    //      (
    //          filter( department => department.name === name)
    //      )
    //  }


}
