import { Component, OnInit } from "@angular/core";
import { NavigationEnd, ActivatedRoute, Router } from "@angular/router";
import { InventoryService } from "../../service/inventory.service";
import { MenuItem } from "primeng/api";
import { FormBuilder } from '@angular/forms';
import { Subcategory } from 'src/app/model/subcategory.model';
import { Item } from 'src/app/model/item.model'
import { LoginService } from '../../service/login.service';
import { HttpClientService}  from '../../service/http-client.service';

@Component({
  selector: "app-view-item-list",
  templateUrl: "./view-item-list.component.html",
  styleUrls: ["./view-item-list.component.scss"]
})
export class ViewItemListComponent implements OnInit {
  public breadcrumbArray: MenuItem[];
  public checkSearchForm: any;
  public subCategory: Subcategory;
  public items: Item[];
  public showItems: Item[];
  public departmentID: string;
  public categoryID: string;
  public subCategoryID: string;
  public departmentName: string;
  public categoryName: string;
  public subCategoryName: string;
  public IfSearch: boolean;
  public navigationSubscription;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public service: InventoryService,
    public formBuilder: FormBuilder,
    public loginService: LoginService,
    public httpClientService: HttpClientService
  ) {
    this.checkSearchForm = this.formBuilder.group({
      itemname: '',
      keyword:'',
    }) ;
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });

  }

  ngOnInit() {
    let currentUrl = this.route.url;
    let res: JSON;
    let categoryLength: number;
    currentUrl.subscribe({
      next: val => {
        console.log(val);
        // this.breadcrumbArray.push(val[1].path);
        this.departmentID = val[1].path;
        this.categoryID = val[2].path;
        this.subCategoryID = val[3].path;
      }
    });
    this.httpClientService.getSubCategoryItems(this.departmentID, this.categoryID, this.subCategoryID).subscribe(
      data => {

        this.items=[];

        res = data.body[0];
        categoryLength = res["category"].split(',').length;
        if(categoryLength===1){
          this.categoryName = res["category"];
          this.departmentName = res["department"];
        }
        else if(categoryLength===2){
          this.categoryName = res["category"].split(',')[0];
          this.subCategoryName = res["category"].split(',')[1];
          this.departmentName = res["department"];
        }
        this.addBreadcrumb(this.departmentName,this.categoryName,this.subCategoryName, this.subCategoryID);

        for(var x in data.body){
          let item = new Item();
          item.condition = data.body[x]["condition"];
          item.description = data.body[x]["description"];
          item.id = data.body[x]["id"];
          item.name = data.body[x]["name"];
          item.price = data.body[x]["price"];
          item.quantity = data.body[x]["quantity"];
          item.category = this.categoryName;
          item.department = this.departmentName;

          this.items.push(item);
        }

    });
    //this.addBreadcrumb(this.departmentID, this.categoryID, this.subCategoryID);
    //this.subCategory = this.service.getSubCategoryByName(this.departmentID, this.categoryID, this.subCategoryID);
    //this.items = this.subCategory.items;
    //this.IfSearch = false;

    //console.log(this.items);
    console.log("initEnd");
  }

  addBreadcrumb(departmentName:string,categoryName:string,subCategoryName:string, subCategoryID:string) {
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label:departmentName,url:'/department/' + this.departmentID});
    this.breadcrumbArray.push({label:categoryName,url: '/department/'+this.departmentID+'/'+this.categoryID});
    this.breadcrumbArray.push({label:subCategoryName,url: '/department/'+this.departmentID+'/'+this.categoryID+'/'+subCategoryID});
  }

  search(info) {
    console.log("press search");
    console.log(this.items);
    console.log(info);
    if(info.itemname!=""){
      console.log(info.itemname);
      this.showItems = [];
      this.showItems = this.items.filter(item=>item.id.toString()==info.itemname);
      this.IfSearch = true;
    }
    else if (info.keyword!=""){
      console.log(info.keyword);
      this.showItems = [];
      this.items.filter(item=>item.department.includes(info.keyword)).forEach(val => this.showItems.push(val))
      this.items.filter(item=>item.category==info.keyword).forEach(val => this.showItems.push(val))
      this.items.filter(item=>item.description.includes(info.keyword)).forEach(val => this.showItems.push(val))
      this.items.filter(item=>item.condition==info.keyword).forEach(val => this.showItems.push(val))
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
    console.log("add item");
  }
}
