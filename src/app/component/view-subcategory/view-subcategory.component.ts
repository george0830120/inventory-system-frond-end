import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../service/inventory.service'
import { Category, Subcategory, Item, Department } from '../../model/index'
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { LoginService } from '../../service/login.service';
import { HttpClientService } from '../../service/http-client.service'
@Component({
  selector: 'app-view-subcategory',
  templateUrl: './view-subcategory.component.html',
  styleUrls: ['./view-subcategory.component.scss']
})
export class ViewSubcategoryComponent implements OnInit {

  public category: Category;
  public departments: Department[];
  public subcategories: { name:string, id:string }[];
  public breadcrumbArray: MenuItem[];
  public item
  constructor(public route: ActivatedRoute,
    public router: Router,
    public service: InventoryService,
    public httpClientService: HttpClientService, 
    public loginService: LoginService 
    ) { 
    }

  ngOnInit() {

    var categoryID: string; 
    var departmentID: string;

    departmentID = (this.parseURL())[0];
    categoryID = (this.parseURL())[1];

    this.httpClientService.getSubcategoriesbyCategoryID(categoryID).subscribe(
      response => {
        this.subcategories = []
        console.log(response.body)
        for(var x in response.body){
          this.subcategories.push({name: response.body[x]["name"], id:response.body[x]["id"]});
        }
        console.log("bug")
        console.log(this.subcategories)
      });



    this.getAllDepartment();

    this.addBreadcrumb(departmentID, categoryID);
  }

  parseURL(){
    var currentURL = this.route.url;
    var categoryID: string; 
    var departmentID: string;
    console.log(currentURL); 
    const subscribe = currentURL.subscribe(
      val => {
        categoryID = val[2].path;
        departmentID = val[1].path; 
      } 
    )
     return [departmentID, categoryID]; 
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
    this.httpClientService.getDepartments().subscribe(response => {
      this.departments = [];
      for(var x in response.body){
        this.departments.push({name: response.body[x]["name"], id:response.body[x]["id"]})
      }
    });
    console.log(this.departments);
  }
}
