import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { InventoryService } from "../../service/inventory.service";
import { MenuItem } from "primeng/api";
import { FormBuilder } from '@angular/forms';
import { Subcategory } from 'src/app/model/subcategory.model';
import { Item } from 'src/app/model/item.model'

@Component({
  selector: "app-view-item-list",
  templateUrl: "./view-item-list.component.html",
  styleUrls: ["./view-item-list.component.scss"]
})
export class ViewItemListComponent implements OnInit {
  private breadcrumbArray: MenuItem[];
  private checkSearchForm: any;
  private subCategories: Subcategory[];
  private items: Item[];
  private showItems: Item[];
  private departmentName: string;
  private categoryName: string;

  constructor(
    private route: ActivatedRoute,
    private service: InventoryService,
    private formBuilder: FormBuilder
  ) {
    this.checkSearchForm = this.formBuilder.group({
      itemname: '',
      keyword:'',
    }) ;

  }

  ngOnInit() {
    let currentUrl = this.route.url;
    let subCategoryName: string;
    currentUrl.subscribe({
      next: val => {
        console.log(val);
        // this.breadcrumbArray.push(val[1].path);
        this.departmentName = val[1].path;
        this.categoryName = val[2].path;
        subCategoryName = val[3].path;
      }
    });
    this.addBreadcrumb(this.departmentName,this.categoryName,subCategoryName);
    this.subCategories = this.service.getSubCategoryByName(this.departmentName,this.categoryName,subCategoryName);
    this.items = this.subCategories[0].items;
    console.log("subcategories");
    console.log(this.subCategories);
    console.log(this.items);
  }

  addBreadcrumb(departmentName:string,categoryName:string,subCategoryName:string) {
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label:departmentName,url:'/department/' + departmentName}); 
    this.breadcrumbArray.push({label:categoryName,url: '/department/'+departmentName+'/'+categoryName});
    this.breadcrumbArray.push({label:subCategoryName,url: '/department/'+departmentName+'/'+categoryName+'/'+subCategoryName});
  }

  search(info) {
    console.log(info);
  }
  addItem() {
    console.log("add item")
  }
}
