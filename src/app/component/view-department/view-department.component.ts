import { Component, OnInit } from "@angular/core";

// /user:id/Department -> user id for identifying privilege
import { Router, ActivatedRoute } from "@angular/router";
import { dummyTestData } from "../../testData-Inventory";
import { Observable } from "rxjs";
import { InventoryService } from "../../service/inventory.service";
import { HttpClientService } from "../../service/http-client.service";
import { Department } from "../../model/deaprtment.model";
import { LoginService } from "../../service/login.service";

export class IDepartment {
  constructor(public name: string) {}
}

@Component({
  selector: "app-view-department",
  templateUrl: "./view-department.component.html",
  styleUrls: ["./view-department.component.scss"]
})
export class ViewDepartmentComponent implements OnInit {
  // public departments: JSON;
  public departments: {name:string, id:string}[];
  public i = 0;
  constructor(
    public route: ActivatedRoute,
    public service: InventoryService,
    public httpClientService: HttpClientService,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    this.departments = [];
    this.httpClientService.getDepartments().subscribe(response => {
      console.log(response.body);
      for(var x in response.body){
        this.departments.push({name: response.body[x]["name"], id:response.body[x]["id"]})
      }
 
    });
    console.log(this.departments);
  /*
    this.service.getDepartments().subscribe(dep => {
      console.log(dep);
      dep.forEach(d => {
        console.log(d);
        this.departments.push(d);
      });
    });

   */
  }
  handle(response) { 
    response.foreach(depObject=>this.departments.push(depObject))
  }
}
