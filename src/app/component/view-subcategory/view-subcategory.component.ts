import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  public category: Category;
  public departments: Department[];
  public subcategories: Subcategory[];
  public breadcrumbArray: MenuItem[];
  public item
  constructor(public route: ActivatedRoute,
    public router: Router,
    public service: InventoryService) { 
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
    this.subcategories = this.category.subcategories;
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
