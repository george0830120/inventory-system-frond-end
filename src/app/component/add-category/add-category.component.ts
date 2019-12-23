import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../service/inventory.service';
import { HttpClientService } from '../../service/http-client.service';
import { MenuItem } from 'primeng/api';
import { Location } from '@angular/common';



@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  profileForm = new FormGroup({
    Name: new FormControl(''),
    Description: new FormControl(''),
    UniqueTag: new FormControl(''),

  });
  condition: SelectItem[];
  public breadcrumbArray: MenuItem[];
  public departmentID: string;
  public departmentName: string;
  constructor(public route: ActivatedRoute,
    public router: Router,
    public service: InventoryService,
    public httpClientService: HttpClientService,
    public location: Location,

    ) {

  }

  ngOnInit() {
    this.parseURL();
    this.httpClientService.getDepartment(this.departmentID).subscribe(response=>{
      this.departmentName = response.body.name;
      this.addBreadcrumb(this.departmentName);
    });
    //this.addBreadcrumb(this.departmentName);
  }

  addBreadcrumb(departmentName:string){
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label:departmentName, url: '/department/'+ this.departmentID});

  }

  parseURL(){
    var currentURL = this.route.url;
    const subscribe = currentURL.subscribe(
      val => {
        this.departmentID = val[1].path;
      }
    )
  }
  backToItemList(){
    // this.router.navigateByUrl('/department/'+this.departmentName);
    this.location.back();
  }

  submit(data){
    console.log(data);
    let postBody = {
      name : data['Name'],
      description: data['Description'],
      tag: data['UniqueTag'],
      sub: 0,
    };
    // this.httpService.addItem(this.departmentName,
    this.httpClientService.addCategory(this.departmentID, postBody).subscribe(response=>{
      console.log(response.body);
    });

    //   data.Name,
    //   data.Description,
    //   data.UniqueTag
    // )
    //TODO: Add Category
    //  this.router.navigateByUrl('/department/'+this.departmentName);
    // this.location.back();
  }

}
