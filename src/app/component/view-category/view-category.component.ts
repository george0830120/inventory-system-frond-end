import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd, NavigationStart } from '@angular/router';
import { InventoryService } from '../../service/inventory.service'
import { Category, Subcategory, Item, Department } from '../../model/index'
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  private departmentSelected: Department;
  private departments: Department[];
  private categories: Category[];
  private breadcrumbArray: MenuItem[];
  private navigationSubscription;  
  private matrixDefaultArray: number[];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: InventoryService) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.ngOnInit();
        }
      });
    }

  ngOnInit() {
    let departmentName = this.parseURL();
    this.getDepartmentCategories(departmentName);
    this.getAllDepartment();
    this.addBreadcrumb(departmentName);
    this.setMatrixNumber(16);
  }

  addBreadcrumb(departmentName:string){
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label:departmentName, url: '/department/'+departmentName});
  }

  parseURL(){
    var currentURL = this.route.url; 
    var departmentName: string;
    console.log(currentURL);
    const subscribe = currentURL.subscribe({
      next: val => departmentName = val[1].path
    })
    return departmentName
  }
  getDepartmentCategories(departmentName: string){
    this.departmentSelected = this.service.getDepartmentByName(departmentName);
    this.categories = this.departmentSelected.categories;
  }
  getAllDepartment(){
    this.departments = [];
    this.service.getDepartments().subscribe(val => val.forEach(dep=>this.departments.push(dep)));
  }
  setMatrixNumber(totalMatrix: number){
    this.matrixDefaultArray = Array.from(Array(totalMatrix -this.categories.length).keys());
  }


}
