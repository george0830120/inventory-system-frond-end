import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../service/inventory.service'
import { MenuItem } from 'primeng/api';
import { Item } from 'src/app/model';

@Component({
  selector: 'app-split-item',
  templateUrl: './split-item.component.html',
  styleUrls: ['./split-item.component.scss']
})
export class SplitItemComponent implements OnInit {

  public breadcrumbArray: MenuItem[];
  public item: Item;
  public items: Item[];
  public departmentName: string;
  public categoryName: string;
  public subcategoryName: string;
  condition: string;
  originQuantity : Number;
  categoryPath: string;


  constructor(public route: ActivatedRoute,
    public router: Router,
    public service: InventoryService) { 
  }

  ngOnInit() {
    this.parseURL();
    
    switch(this.item.condition) {
      case 0: this.condition="Broken"; break;
      case 1: this.condition="Bad"; break;
      case 2: this.condition="Average"; break;
      case 3: this.condition="Good"; break;
      case 4: this.condition="New"; break;
      default: this.condition="empty"; break;

    }
    console.log(this.item);
    this.items = [];
    this.items.push(this.item);
    this.originQuantity = new Number(this.item.quantity);
    this.categoryPath = this.departmentName+' > '+this.categoryName+' > '+this.subcategoryName;
  }

  parseURL(){
    var currentURL = this.route.url;

    var itemId: string;
    console.log(currentURL); 
    const subscribe = currentURL.subscribe(
      val => {
        this.categoryName = val[2].path;
        this.departmentName = val[1].path; 
        this.subcategoryName = val[3].path;
        itemId = val[4].path;
      } 
    )
    this.item = this.service.getSubCategoryByName(this.departmentName, this.categoryName, this.subcategoryName).items.find(i=>i.id===itemId);

  }

  cloneItem(i){
    if(this.items[i].quantity > 1){

      var newItem = Object.assign({},this.items[i]);
      newItem.quantity = 1;
      this.items.push(newItem);
      this.items[i].quantity -= newItem.quantity;
    }
  }
  adjustQuantity(i, newQuantity:number){
    if(Number(this.items[i-1].quantity) + Number(this.items[i].quantity) - newQuantity > 0){
      this.items[i-1].quantity = Number(this.items[i-1].quantity) + Number(this.items[i].quantity) - newQuantity;
      console.log(this.items[i-1].quantity)
      console.log("end")
      this.items[i].quantity = newQuantity;
    }
  }
  
}
