import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../service/inventory.service'
import { MenuItem } from 'primeng/api';
import { Item } from 'src/app/model';
import { HttpClientService } from '../../service/http-client.service'
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {
  profileForm = new FormGroup({
    Name: new FormControl(''),
    Description: new FormControl(''),
    Quantity: new FormControl(''),
    Price: new FormControl(''),
    Condition: new FormControl(''),
    Reason: new FormControl(''),
  });
  condition: SelectItem[];
  reason:SelectItem[];
  public breadcrumbArray: MenuItem[];
  public item: Item;
  public itemId: string;
  public departmentID: string;
  public categoryID: string;
  public subcategoryID: string;
  public qChanged: boolean;

  constructor(public route: ActivatedRoute,
    public router: Router,
    public service: InventoryService,
    public httpClientService : HttpClientService, 
    public formBuilder: FormBuilder) { 
    this.condition = [
      {label:'Condition', value:null},
      {label:"Broken", value: 0},
      {label:"Bad",value: 1},
      {label:"Average",value: 2},
      {label:"Good",value: 3},
      {label:"New",value: 4}
    ];
    this.reason = [
      {label:"Reason", value:null},
      {label:"Scraped", value:"Scraped"},
      {label:"Given away", value: "Given away"},
      {label:"Discarded",value: "Discarded"},
      {label:"Broken",value: "Broken"},
      {label:"Shrinkage",value: "Shrinkage"},
      {label:"Correction",value: "Correction"},
      {label:"Other",value: "Other"}
    ];
  }

  ngOnInit() {
    var departmentName: string;
    var categoryName: string;
    var subcategoryName: string;
    this.parseURL();
    this.item = new Item();
    this.qChanged = false;
    
    this.httpClientService.getDepartment(this.departmentID).subscribe(
      response =>{
        departmentName = response.body["name"];
        this.httpClientService.getSpecificCategory(this.categoryID).subscribe(
          response => { 
            categoryName = response.body["name"];
            this.httpClientService.getSpecificCategory(this.subcategoryID).subscribe(
              response =>{
                subcategoryName = response.body["name"];
                this.addBreadcrumb(departmentName, categoryName, subcategoryName)
                this.httpClientService.getItemByID(this.itemId).subscribe(
                  response => {
                    this.item.id = response.body["id"]
                    this.item.description = response.body["description"]
                    this.item.quantity = response.body["quantity"]
                    this.item.price = response.body["price"]
                    this.item.condition = response.body["condition"]["id"]
                    this.profileForm = this.formBuilder.group({
                      Name: this.item.name,
                      Description: this.item.description,
                      Quantity:  this.item.quantity,
                      Price: this.item.price,
                      Condition:  this.item.condition,
                      Reason: null
                    })
                  })
              })   
          })
      })

  }

  addBreadcrumb(departmentName:string, categoryName:string, subcategoryName:string){
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label:departmentName, url: '/department/'+departmentName});
    this.breadcrumbArray.push({label:categoryName, url: '/department/'+departmentName+'/'+categoryName});
    this.breadcrumbArray.push({label:subcategoryName, url: '/department/'+departmentName+'/'+categoryName+'/'+subcategoryName});
  }

  parseURL(){
    var currentURL = this.route.url;
     
    console.log(currentURL); 
    const subscribe = currentURL.subscribe(
      val => {
        this.categoryID = val[2].path;
        this.departmentID = val[1].path; 
        this.subcategoryID = val[3].path;
        this.itemId = val[4].path;
      } 
    )
  }

  backToItemList(){
    this.router.navigateByUrl('/department/'+this.departmentID+'/'+this.categoryID+'/'+this.subcategoryID);
  }

  submit(data:FormGroup){
    console.log(data);
    var condition: string;
    var postBody;
    switch( data['Condition']){

      case 0: condition = "Broken"; break;
      case 1: condition = "Bad"; break;
      case 2: condition = "Average"; break;
      case 3: condition = "Good"; break;
      case 4: condition = "New"; break;
    }
    if(this.qChanged){
      postBody = {
        description: data['Description'],
        quantity : data['Quantity'],
        price : data['Price'],
        condition : condition,
        reason: data['Reason']
      };
    }else{
      postBody = {
        description: data['Description'],
        quantity : data['Quantity'],
        price : data['Price'],
        condition : condition
    }
  }

    this.httpClientService.editItem(this.itemId, JSON.stringify(postBody)).subscribe(response=>{
      console.log(response.body);
    });

    this.router.navigateByUrl('/department/'+this.departmentID+'/'+this.categoryID+'/'+this.subcategoryID);
  }

  quantityChanged(){
    this.qChanged = true;
    

  }

}
