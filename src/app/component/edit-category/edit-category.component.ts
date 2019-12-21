import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../service/inventory.service'
import { MenuItem } from 'primeng/api';
import { Item, Category } from 'src/app/model';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  profileForm = new FormGroup({
    uniqueTag: new FormControl(''),
    Name: new FormControl(''),
    Description: new FormControl(''),
  });

  public breadcrumbArray: MenuItem[];
  public category: Category;
  public departmentName: string;
  public categoryName: string;

  constructor(public route: ActivatedRoute,
    public router: Router,
    public service: InventoryService) { 

  }

  ngOnInit() {
    this.parseURL();
    console.log(this.departmentName+this.categoryName);

    this.addBreadcrumb(this.departmentName, this.categoryName);
    this.category = this.service.getCategoryByName(this.departmentName, this.categoryName);
    this.profileForm.patchValue({uniqueTag: this.category.uniqueTag});
    console.log(this.category.uniqueTag)
    console.log(this.category)
    
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

  submit(x:FormGroup){
    console.log(x);
    // TODO: update item

    this.router.navigateByUrl('/department/'+this.departmentName+'/'+this.categoryName);
  }


}
