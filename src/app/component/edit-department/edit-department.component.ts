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

  editForm = new FormGroup({
    UniqueTag: new FormControl(''),
    Name: new FormControl(''),
    Description: new FormControl(''),
    POSDepartmentCode: new FormControl('')
  });

  public breadcrumbArray: MenuItem[];
  public department: Department;
  public departmentID: string;
  public categoryName: string;


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
    this.httpService.getDepartment(this.departmentID).subscribe((res) => {
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
      this.addBreadcrumb(this.department.name);
    })

    // this.department = this.service.getDepartmentByName(this.departmentName);

    
  }

  addBreadcrumb(departmentName:string){
    this.breadcrumbArray = [];
    this.breadcrumbArray.push({label:this.department.name, url: '/department/'+departmentName});
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
    this.location.back();
  }

  submit(data){
    let postData = {
      "name": data["Name"],
      "description": data["Description"],
      "code": data["POSDepartmentCode"],
      "tag": data["UniqueTag"]
    }
    this.httpService.editDepartment(this.departmentID,
      JSON.stringify(postData)
      ).subscribe((res) => {
        console.log(res)
      })
    // TODO: update item
     this.router.navigateByUrl('/department/'+this.departmentID);
  }

  delete(){
    this.httpService.deleteDepartment(this.departmentID
      ).subscribe((res) => {
        console.log(res)
      })
    this.router.navigateByUrl('/department')
  }
}
