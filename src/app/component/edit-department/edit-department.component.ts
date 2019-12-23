import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../service/inventory.service'
import { MenuItem } from 'primeng/api';
import { Category, Department } from 'src/app/model';
import { Location } from '@angular/common';
import { HttpClientService } from '../../service/http-client.service';
import { FormBuilder } from '@angular/forms';

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
  private editForm: any;

  constructor(public route: ActivatedRoute,
    public router: Router,
    public service: InventoryService,
    public location: Location ,
    public httpService: HttpClientService,
    public formBuilder: FormBuilder
    ) { 

  }

  ngOnInit() {
    this.parseURL();
    this.department = new Department();
    this.httpService.getDepartment(this.departmentName).subscribe((res) => {
      this.department.POSDepartmentCode = res.body["code"];
      this.department.description = res.body["description"];
      this.department.name = res.body["name"];
      this.department.uniqueTag = res.body["tag"];
      this.editForm = this.formBuilder.group({
        UniqueTag: this.department.uniqueTag,
        Name: this.department.name,
        Description: this.department.description,
        POSDepartmentCode: this.department.POSDepartmentCode
      })
      this.addBreadcrumb(this.departmentName, this.categoryName);
    })

    // this.department = this.service.getDepartmentByName(this.departmentName);
    this.profileForm.patchValue({UniqueTag: this.department.uniqueTag});
    
  }

  addBreadcrumb(departmentName:string, categoryName:string){
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label:this.department.name, url: '/department/'+departmentName});
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

  submit(data){
    let postData = {
      "name": data["Name"],
      "description": data["Description"],
      "code": data["POSDepartmentCode"],
      "tag": data["UniqueTag"]
    }
    this.httpService.editDepartment(this.departmentName,
      JSON.stringify(postData)
      ).subscribe((res) => {
        console.log(res)
      })
    // TODO: update item
    // this.location.back();
    // this.router.navigateByUrl('/department/'+this.departmentName);
  }

  delete(){
    this.httpService.deleteDepartment(this.departmentName
      ).subscribe((res) => {
        console.log(res)
      })
  }
}
