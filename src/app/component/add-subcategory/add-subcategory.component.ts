import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../service/inventory.service';
import { HttpClientService } from '../../service/http-client.service';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
}) 
export class AddSubcategoryComponent implements OnInit {
  profileForm = new FormGroup({
    Name: new FormControl(''),
    Description: new FormControl(''),
    UniqueTag: new FormControl(''),

  });

  public breadcrumbArray: MenuItem[];
  public departmentName: string;
  public categoryName: string;

  constructor(public route: ActivatedRoute,
    public router: Router,
    public service: InventoryService,
    public httpService: HttpClientService,
    ) { 

  }

  ngOnInit() {
    this.parseURL();

    this.addBreadcrumb(this.departmentName, this.categoryName);
  }

  addBreadcrumb(departmentName:string, categoryName:string){
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label:departmentName, url: '/department/'+departmentName});
    this.breadcrumbArray.push({label:categoryName, url: '/department/'+departmentName+'/'+categoryName});
  }

  parseURL(){
    var currentURL = this.route.url;
    console.log(currentURL); 
    const subscribe = currentURL.subscribe(
      val => {
        this.categoryName = val[2].path;
        this.departmentName = val[1].path; 

      } 
    )
  }
  backToItemList(){
    this.router.navigateByUrl('/department/'+this.departmentName+'/'+this.categoryName);
  }

  submit(data){
    console.log(data);
    // this.httpService.addItem(this.departmentName,
    //   this.categoryName,
    //   data.Name,
    //   data.Description,
    //   data.Quantity,
    //   data.Condition,
    //   data.Price
    // )
    //TODO: Add item
     this.router.navigateByUrl('/department/'+this.departmentName+'/'+this.categoryName);
  }

}
