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
    Name: new FormControl(''),
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

  constructor(public route: ActivatedRoute,
    public router: Router,
    public service: InventoryService,
    public httpService: HttpClientService,
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
    this.parseURL();

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
    console.log(currentURL);
    const subscribe = currentURL.subscribe(
      val => {
        this.categoryName = val[2].path;
        this.departmentName = val[1].path;
        this.subcategoryName = val[3].path;
      }
    )
  }
  backToItemList(){
    this.router.navigateByUrl('/department/'+this.departmentName+'/'+this.categoryName+'/'+this.subcategoryName);
  }

  submit(data){
    console.log(data);

    //TODO: Add item
     this.router.navigateByUrl('/department/'+this.departmentName+'/'+this.categoryName+'/'+this.subcategoryName);
  }
}
