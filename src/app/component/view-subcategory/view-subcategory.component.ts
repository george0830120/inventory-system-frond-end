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

  private category: Observable<Category>;
  private departments: Department[];
  private subcategories: Subcategory[];
  private breadcrumbArray: MenuItem[];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: InventoryService) { 
    }

  ngOnInit() {
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
    this.category = this.service.getCategoryByName(departmentName, categoryName);
    this.category.subscribe(val=>console.log(val));

    this.departments = [];
    this.service.getDepartments().subscribe(val=>this.departments.push(val))
    this.category.subscribe(val=>this.subcategories = val.subcategories);
    console.log(this.subcategories);
    this.addBreadcrumb(departmentName, categoryName);
  }

  addBreadcrumb(departmentName:string, categoryName:string){
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label:departmentName, url: '/department/'+departmentName});
    this.breadcrumbArray.push({label:categoryName, url: '/department/'+departmentName+'/'+categoryName});
  }

}