import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { InventoryService } from '../../service/inventory.service'
import { Category, Subcategory, Item } from '../../model/index'
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  private category: Category;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: InventoryService) { 
    
    }

  ngOnInit() {
    var currentURL = this.route.url;
    console.log(currentURL);
    var department = currentURL.pipe(
      take(3)
    );
    console.log(department);

  }

}
