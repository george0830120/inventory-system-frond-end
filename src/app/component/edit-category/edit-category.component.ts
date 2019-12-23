import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../service/inventory.service'
import { MenuItem } from 'primeng/api';
import { Item, Category } from 'src/app/model';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from 'src/app/service/http-client.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  profileForm = new FormGroup({
    Name: new FormControl(''),
    Description: new FormControl(''),
  });

  public breadcrumbArray: MenuItem[];
  public category: Category;
  public departmentID: string;
  public categoryID: string;
  public departmentName: string;
  public categoryName: string;
  public sub: boolean;

  constructor(public route: ActivatedRoute,
    public router: Router,
    public service: InventoryService,
    public location: Location,
    public httpClientService: HttpClientService,
    public formBuilder: FormBuilder
    ) {

  }

  ngOnInit() {
    this.parseURL();
    console.log(this.departmentID+this.categoryID);
    this.category = new Category();

      this.httpClientService.getDepartment(this.departmentID).subscribe(
        response => {
          console.log(response.body)
          this.departmentName  = response.body["name"];
          this.httpClientService.getSpecificCategory(this.categoryID).subscribe(
            response => {
              this.category.name = response.body["name"]
              this.category.description = response.body["description"];
              this.category.uniqueTag = response.body["tag"];
              this.sub = response.body["sub"];
              this.profileForm = this.formBuilder.group({
                UniqueTag: this.category.uniqueTag,
                Name: this.category.name,
                Description: this.category.description,
              })
              this.addBreadcrumb()
            });
      });
  //  this.profileForm.patchValue({uniqueTag: this.category.uniqueTag});


  }

  addBreadcrumb(){
    this.breadcrumbArray = []
    console.log("HelloHelloHello")
    console.log(this.category.name)
    this.breadcrumbArray.push({label:this.departmentName, url: '/department/'+this.departmentID});
    this.breadcrumbArray.push({label:this.category.name, url: '/department/'+this.departmentID+'/'+this.categoryID});
  }

  parseURL(){
    var currentURL = this.route.url;

    console.log(currentURL);
    const subscribe = currentURL.subscribe(
      val => {
        this.categoryID = val[2].path;
        this.departmentID = val[1].path;
      }
    )
  }

  backToItemList(){
    this.location.back();
    // this.router.navigateByUrl('/department/'+this.departmentName+'/'+this.categoryName);
  }

  submit(x:FormGroup){
    console.log(x);
    // TODO: update item

    // this.location.back();
    // this.router.navigateByUrl('/department/'+this.departmentName+'/'+this.categoryName);
    let postData = {
      "name": FormGroup["Name"],
      "description": FormGroup["Description"],
      "tag": FormGroup["UniqueTag"]
    }
    this.httpClientService.editDepartment(this.departmentID,
      JSON.stringify(postData)
      ).subscribe((res) => {
        console.log(res)
      })
    // TODO: update item
    // this.location.back();
     this.router.navigateByUrl('/department/'+this.departmentID);
  }
  


}
