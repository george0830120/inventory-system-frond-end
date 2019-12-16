import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InventoryService } from "../../service/inventory.service";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-view-item-list",
  templateUrl: "./view-item-list.component.html",
  styleUrls: ["./view-item-list.component.scss"]
})
export class ViewItemListComponent implements OnInit {
  private breadcrumbArray: MenuItem[];

  constructor(
    private route: ActivatedRoute,
    private service: InventoryService
  ) {}

  ngOnInit() {
    let currentUrl = this.route.url;
    let departmentName: string;
    let categoryName: string;
    let subCategoryName: string;
    currentUrl.subscribe({
      next: val => {
        console.log(val);
        // this.breadcrumbArray.push(val[1].path);
        departmentName = val[1].path;
        categoryName = val[2].path;
        subCategoryName = val[3].path;
      }
    });
    this.addBreadcrumb(departmentName,categoryName,subCategoryName);
  }

  addBreadcrumb(departmentName:string,categoryName:string,subCategoryName:string) {
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label:departmentName,url:'/department/' + departmentName}); 
    this.breadcrumbArray.push({label:categoryName,url: '/department/'+departmentName+'/'+categoryName});
    this.breadcrumbArray.push({label:subCategoryName,url: '/department/'+departmentName+'/'+categoryName+'/'+subCategoryName});
  }
}
