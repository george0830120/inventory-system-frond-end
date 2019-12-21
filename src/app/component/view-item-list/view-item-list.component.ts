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
  private subCategory: Subcategory;
  private items: Item[];
  private showItems: Item[];
  private departmentName: string;
  private categoryName: string;
  private IfSearch: boolean;


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
    this.subCategory = this.service.getSubCategoryByName(this.departmentName,this.categoryName, subCategoryName);
    console.log("subCategory");
    console.log(this.subCategory);
    this.items = this.subCategory.items;
    this.IfSearch = false;

    console.log(this.items);
  }

  addBreadcrumb(departmentName:string,categoryName:string,subCategoryName:string) {
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label:departmentName,url:'/department/' + departmentName}); 
    this.breadcrumbArray.push({label:categoryName,url: '/department/'+departmentName+'/'+categoryName});
    this.breadcrumbArray.push({label:subCategoryName,url: '/department/'+departmentName+'/'+categoryName+'/'+subCategoryName});
  }

  search(info) {
    console.log("press search");
    console.log(info);
    if(info.itemname!=""){
      console.log(info.itemname);
      this.showItems = [];
      this.showItems = this.items.filter(item=>item.id===info.itemname);
      this.IfSearch = true;
    }
    else if (info.keyword!=""){
      console.log(info.keyword);
      this.showItems = [];
      this.items.filter(item=>item.name.includes(info.keyword)).forEach(val => this.showItems.push(val))
      this.items.filter(item=>item.description.includes(info.keyword)).forEach(val => this.showItems.push(val))
      this.items.filter(item=>item.condition===info.keyword).forEach(val => this.showItems.push(val))
      this.items.filter(item=>item.quantity===Number(info.keyword)).forEach(val => this.showItems.push(val))
      this.items.filter(item=>item.price===Number(info.keyword)).forEach(val => this.showItems.push(val))
      this.IfSearch = true;
    }else{
      this.IfSearch = false;
    }
    console.log(this.IfSearch);
    console.log(this.showItems);
  }
  addItem() {
    console.log("add item")
  }
}
