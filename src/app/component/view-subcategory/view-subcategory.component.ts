import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InventoryService } from '../../service/inventory.service'
import { Category, Subcategory, Item, Department } from '../../model/index'
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-view-subcategory',
  templateUrl: './view-subcategory.component.html',
  styleUrls: ['./view-subcategory.component.scss']
})
export class ViewSubcategoryComponent implements OnInit {

  private category: Category[];
  private departments: Department[];
  private subcategories: Subcategory[];
  private breadcrumbArray: MenuItem[];
  private item
  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: InventoryService) { 
    }

  ngOnInit() {

    var categoryName: string; 
    var departmentName: string;

    departmentName = (this.parseURL())[0];
    categoryName = (this.parseURL())[1];
    this.getSubcategories(departmentName, categoryName);
    this.getAllDepartment();

    console.log(this.subcategories);
    this.addBreadcrumb(departmentName, categoryName);
  }

  parseURL(){
    var currentURL = this.route.url;
    var categoryName: string; 
    var departmentName: string;
    console.log(currentURL); 
    const subscribe = currentURL.subscribe(
      val => {
        categoryName = val[2].path;
        departmentName = val[1].path; 
      } 
    )
     return [departmentName, categoryName]; 
  }

  getSubcategories(departmentName: string, categoryName: string){
    this.category = this.service.getCategoryByName(departmentName, categoryName);
    this.category.forEach(val=>console.log(val));
    this.category.forEach(val=>this.subcategories = val.subcategories);
  }

  addBreadcrumb(departmentName:string, categoryName:string){
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label:departmentName, url: '/department/'+departmentName});
    this.breadcrumbArray.push({label:categoryName, url: '/department/'+departmentName+'/'+categoryName});
  }

  getAllDepartment(){
    this.departments = [];
    this.service.getDepartments().subscribe(val => val.forEach(dep=>this.departments.push(dep)));
  }

}
