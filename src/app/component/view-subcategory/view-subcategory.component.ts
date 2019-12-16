import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InventoryService } from '../../service/inventory.service'
import { Category, Subcategory, Item, Department } from '../../model/index'
import { take, first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-subcategory',
  templateUrl: './view-subcategory.component.html',
  styleUrls: ['./view-subcategory.component.scss']
})
export class ViewSubcategoryComponent implements OnInit {

  private category: Observable<Category>;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: InventoryService) { 
    
    }

  ngOnInit() {
    var currentURL = this.route.url;
    var categoryName: string; 
    var departmentName: string;
    console.log(currentURL);

    const subscribe = currentURL.subscribe(
      val => {
        categoryName = val[2].path;
        departmentName = val[1].path; 
      } 
    )
    this.category = this.service.getCategoryByName(departmentName, categoryName);
    this.category.subscribe(val=>console.log(val));


  }

}
