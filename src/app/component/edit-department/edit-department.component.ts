import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../service/inventory.service'
import { MenuItem } from 'primeng/api';
import { Category, Department } from 'src/app/model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {

  profileForm = new FormGroup({
    UniqueTag: new FormControl(''),
    Name: new FormControl(''),
    Description: new FormControl(''),
    POSDepartmentCode: new FormControl('')
  });

  public breadcrumbArray: MenuItem[];
  public department: Department;
  public departmentName: string;
  public categoryName: string;

  constructor(public route: ActivatedRoute,
    public router: Router,
    public service: InventoryService,
    public location: Location 
    ) { 

  }

  ngOnInit() {
    this.parseURL();
    console.log(this.departmentName+this.categoryName);

    this.addBreadcrumb(this.departmentName, this.categoryName);
    this.department = this.service.getDepartmentByName(this.departmentName);
    this.profileForm.patchValue({UniqueTag: this.department.uniqueTag});
    console.log(this.department)
    
  }

  addBreadcrumb(departmentName:string, categoryName:string){
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label:departmentName, url: '/department/'+departmentName});
  }

  parseURL(){
    var currentURL = this.route.url;

    console.log(currentURL); 
    const subscribe = currentURL.subscribe(
      val => {
        this.departmentName = val[1].path; 
      } 
    )
  }

  backToItemList(){
    this.location.back();
    // this.router.navigateByUrl('/department/'+this.departmentName);
  }

  submit(x:FormGroup){
    console.log(x);
    // TODO: update item
    // this.location.back();
    // this.router.navigateByUrl('/department/'+this.departmentName);
  }

}
