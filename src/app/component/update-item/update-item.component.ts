import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../service/inventory.service'
import { MenuItem } from 'primeng/api';
import { Item } from 'src/app/model';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {
  profileForm = new FormGroup({
    ID: new FormControl(),
    Name: new FormControl(''),
    Description: new FormControl(''),
    Quantity: new FormControl(''),
    Price: new FormControl(''),
    Condition: new FormControl(''),
  });
  condition: SelectItem[];
  private breadcrumbArray: MenuItem[];
  private item: Item;
  private departmentName: string;
  private categoryName: string;
  private subcategoryName: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: InventoryService) { 
    this.condition = [
      {label:'Condition', value:null},
      {label:"Broken", value: 0},
      {label:"Bad",value: 1},
      {label:"Average",value: 2},
      {label:"Good",value: 3},
      {label:"New",value: 4}
    ];
  }

  ngOnInit() {
    this.parseURL();
    console.log(this.departmentName+this.categoryName+this.subcategoryName);
    this.profileForm.patchValue({ID: this.item.id})
    this.addBreadcrumb(this.departmentName, this.categoryName, this.subcategoryName);
    
  }

  addBreadcrumb(departmentName:string, categoryName:string, subcategoryName:string){
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label:departmentName, url: '/department/'+departmentName});
    this.breadcrumbArray.push({label:categoryName, url: '/department/'+departmentName+'/'+categoryName});
    this.breadcrumbArray.push({label:subcategoryName, url: '/department/'+departmentName+'/'+categoryName+'/'+subcategoryName});
  }

  parseURL(){
    var currentURL = this.route.url;
    var categoryName: string; 
    var departmentName: string;
    var subcategoryName: string
    var itemId: string;
    console.log(currentURL); 
    const subscribe = currentURL.subscribe(
      val => {
        this.categoryName = val[2].path;
        this.departmentName = val[1].path; 
        this.subcategoryName = val[3].path;
        itemId = val[4].path;
      } 
    )
    this.item = this.service.getSubCategoryByName(this.departmentName, this.categoryName, this.subcategoryName).items.find(i=>i.id===itemId);
  }

  backToItemList(){
    this.router.navigateByUrl('/department/'+this.departmentName+'/'+this.categoryName+'/'+this.subcategoryName);
  }

  submit(x:FormGroup){
    console.log(x);
    // TODO: update item

    this.router.navigateByUrl('/department/'+this.departmentName+'/'+this.categoryName+'/'+this.subcategoryName);
  }

}
