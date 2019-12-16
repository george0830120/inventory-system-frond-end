import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InventoryService } from '../../service/inventory.service'
import { Category, Subcategory, Item, Department } from '../../model/index'
import { take, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  private department: Observable<Department>;
  private departments: Department[];
  private categories: Category[];
  private breadcrumbArray: MenuItem[];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: InventoryService) { 
    
    }

  ngOnInit() {
    var currentURL = this.route.url; 
    var departmentName:string;
    console.log(currentURL);
    const subscribe = currentURL.subscribe({
      next: val => departmentName = val[1].path 
    })
    this.department = this.service.getDepartmentByName(departmentName);
    this.departments = [];
    this.service.getDepartments().subscribe(val=>this.departments.push(val))
    this.department.subscribe(val=>this.categories = val.categories);
    console.log(this.categories);

    this.addBreadcrumb(departmentName);
    
  }

  addBreadcrumb(departmentName:string){
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label:departmentName, url: '/department/'+departmentName});
  }


}
