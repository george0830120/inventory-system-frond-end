import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { SelectItem } from "primeng/api";
import { Router, ActivatedRoute } from "@angular/router";
import { InventoryService } from "../../service/inventory.service";
import { HttpClientService } from "../../service/http-client.service";
import { MenuItem } from "primeng/api";
import { Location } from "@angular/common";
@Component({
  selector: "app-add-subcategory",
  templateUrl: "./add-subcategory.component.html",
  styleUrls: ["./add-subcategory.component.scss"]
})
export class AddSubcategoryComponent implements OnInit {
  profileForm = new FormGroup({
    Name: new FormControl(""),
    Description: new FormControl(""),
    UniqueTag: new FormControl("")
  });

  public breadcrumbArray: MenuItem[];
  public departmentName: string;
  public categoryName: string;
  public departmentID: string;
  public categoryID: string;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: InventoryService,
    public httpService: HttpClientService,
    public location: Location,
    public httpClientService: HttpClientService,
  ) {}

  ngOnInit() {
    this.parseURL();
    this.httpClientService.getDepartment(this.departmentID).subscribe(response=>{
      this.departmentName = response.body["name"];
    })

    this.httpClientService.getCategory(this.categoryID).subscribe(response=>{
      this.categoryName = response.body["name"];
      this.addBreadcrumb(this.departmentName, this.categoryName);
    })

  }

  addBreadcrumb(departmentName: string, categoryName: string) {
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({
      label: departmentName,
      url: "/department/" + this.departmentID
    });
    this.breadcrumbArray.push({
      label: categoryName,
      url: "/department/" + this.departmentID + "/" + this.categoryID,
    });
  }

  parseURL() {
    var currentURL = this.route.url;
    const subscribe = currentURL.subscribe(val => {
      this.categoryID = val[2].path;
      this.departmentID = val[1].path;
    });
  }
  backToItemList() {
    this.location.back();
    // this.router.navigateByUrl(
    //   "/department/" + this.departmentName + "/" + this.categoryName
    // );
  }

  submit(data) {
    let postBody = {
      name : data['Name'],
      description: data['Description'],
      tag: data['UniqueTag'],
    };
    this.httpClientService.addSubCategory(this.categoryID, JSON.stringify(postBody)).subscribe(response=>{
      console.log(response.body);
    });


    // this.httpService.addItem(this.departmentName,
    //   this.categoryName,
    //   data.Name,
    //   data.Description,
    //   data.Quantity,
    //   data.Condition,
    //   data.Price
    // )
    //TODO: Add item
    // this.location.back();
    // this.router.navigateByUrl(
    //   "/department/" + this.departmentName + "/" + this.categoryName
    // );
  }
}
