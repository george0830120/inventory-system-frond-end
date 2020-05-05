import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../service/inventory.service';
import { HttpClientService } from '../../service/http-client.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  profileForm = new FormGroup({
    ID: new FormControl(''),
    Description: new FormControl(''),
    Quantity: new FormControl(''),
    Price: new FormControl(''),
    Condition: new FormControl(''),
  });
  condition: SelectItem[];
  public breadcrumbArray: MenuItem[];
  public departmentName: string;
  public categoryName: string;
  public subcategoryName: string;

  public departmentID: string;
  public categoryID: string;
  public subcategoryID: string;

  constructor(public route: ActivatedRoute,
    public router: Router,
    public service: InventoryService,
    public httpClientService: HttpClientService,
    ) {
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
    this.subcategoryName;
    this.subcategoryID;
    this.departmentName;
    this.departmentName;
    this.categoryID;
    this.categoryName;
    this.parseURL();
    this.httpClientService.getDepartment(this.departmentID).subscribe(response=>{
      this.departmentName=response.body["name"];
      this.httpClientService.getCategory(this.categoryID).subscribe(response=>{
        this.categoryName=response.body["name"];
        this.httpClientService.getSubCategories(this.categoryID).subscribe(response=>{
          for(var x in response.body){
            if(response.body[x]["id"]==this.subcategoryID){
              this.subcategoryName = response.body[x]["name"];
            }
          }
          this.addBreadcrumb(this.departmentName, this.categoryName, this.subcategoryName);
        });
      });
    });




  }

  addBreadcrumb(departmentName:string, categoryName:string, subcategoryName:string){
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label: this.departmentName, url: '/department/'+ this.departmentID});
    this.breadcrumbArray.push({label: this.categoryName, url: '/department/'+ this.departmentID+'/'+ this.categoryID});
    this.breadcrumbArray.push({label: this.subcategoryName, url: '/department/'+ this.departmentID+'/'+ this.categoryID+'/'+ this.subcategoryID});
  }

  parseURL(){
    var currentURL = this.route.url;
    const subscribe = currentURL.subscribe(
      val => {
        this.categoryID = val[2].path;
        this.departmentID = val[1].path;
        this.subcategoryID = val[3].path;
      }
    )

  }

  backToItemList(){
    this.router.navigateByUrl('/department/'+this.departmentID+'/'+this.categoryID+'/'+this.subcategoryID);
  }

  submit(data){
    console.log(data);
    let res: string;
    for(var x in this.condition){
      if(this.condition[x]['value']===data['Condition']){
        res = this.condition[x]['label']
      }
    }
    let postBody = {
      description: data['Description'],
      quantity: +data['Quantity'],
      condition: res,
      price: +data['Price'],
      did: +this.departmentID,
      cid: +this.categoryID,
      scid: +this.subcategoryID,
    };

    this.httpClientService.addItem(JSON.stringify(postBody)).subscribe(response => {
      console.log(response);
    })

    //TODO: Add item
     this.router.navigateByUrl('/department/'+this.departmentID+'/'+this.categoryID+'/'+this.subcategoryID);
  }
}
