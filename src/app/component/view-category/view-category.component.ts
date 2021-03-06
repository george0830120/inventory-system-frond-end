import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd, NavigationStart } from '@angular/router';
import { InventoryService } from '../../service/inventory.service'
import { Category, Subcategory, Item, Department } from '../../model/index'
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { HttpClientService } from 'src/app/service/http-client.service';
import { LoginService } from '../../service/login.service';
//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  public departmentSelected: Department;
  public departments: {name:string, id:string}[];
  public categories: { name:string, id:string }[];
  public breadcrumbArray: MenuItem[];
  public navigationSubscription;
  public matrixDefaultArray: number[];
  constructor(public route: ActivatedRoute,
    public router: Router,
    public service: InventoryService,
    public httpClientService: HttpClientService,
    public loginService: LoginService
    ) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.ngOnInit();
        }
      });
    }

  ngOnInit() {
    let departmentID = this.parseURL();
    console.log("get categories");
    this.httpClientService.getCategoriesbyDepartmentID(departmentID).subscribe(

      response => {
        this.categories = []
        for(var x in response.body){
          this.categories.push({name: response.body[x]["name"], id:response.body[x]["id"]});

        }
        
      }
    );
    this.getAllDepartment(departmentID);

    //this.addBreadcrumb(departmentID);
    //this.setMatrixNumber(16); cause error of length undefined
  }

  // handle(response) {
  //   console.log("handling...")
  //   this.categories = response;
  // }

  addBreadcrumb(departmentName:string, departmentID:string){
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label: departmentName, url: '/department/'+departmentID});
    console.log("push breadcomb ");
  }

  getDepartment(id: string) {


  }
  parseURL(){
    var currentURL = this.route.url;
    var departmentID: string;
    console.log(currentURL);
    const subscribe = currentURL.subscribe({
      next: val => departmentID = val[1].path
    })
    return departmentID;
  }

  getAllDepartment(id){

    this.httpClientService.getDepartments().subscribe(response => {
      this.departments = [];
      for(var x in response.body){
        this.departments.push({name: response.body[x]["name"], id:response.body[x]["id"]});
        if(response.body[x]["id"]==id){
          console.log(response.body[x]["name"]);
          this.addBreadcrumb(response.body[x]["name"], id);
        }
      }
    });
  }


  setMatrixNumber(totalMatrix: number){
    this.matrixDefaultArray = Array.from(Array(totalMatrix -this.categories.length).keys());
  }


}
