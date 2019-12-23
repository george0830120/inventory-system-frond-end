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
  });
  condition: SelectItem[];
  public breadcrumbArray: MenuItem[];
  public item: Item;
  public itemId: string;
  public departmentID: string;
  public categoryID: string;
  public subcategoryID: string;

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
  }

  ngOnInit() {
    var departmentName: string;
    var categoryName: string;
    var subcategoryName: string;
    this.parseURL();
    this.item = new Item();
    console.log(this.departmentID+this.categoryID+this.subcategoryID);
    this.addBreadcrumb(this.departmentID, this.categoryID, this.subcategoryID);
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
                      Condition:  this.item.condition
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
    // TODO: update item
    let postBody = {
      
      description: data['Description'],
      quantity : data['Quantity'],
      price : data['Price'],
      condition : data['Condition'],
      // department : this.departmentID,
      // category : this.categoryID,
      category : this.subcategoryID,
    };
    console.log(postBody);
    // this.httpService.addItem(this.departmentName,
    this.httpClientService.addItem(this.itemId, JSON.stringify(postBody)).subscribe(response=>{
      console.log(response.body);
    });


    this.router.navigateByUrl('/department/'+this.departmentID+'/'+this.categoryID+'/'+this.subcategoryID);
  }

}
