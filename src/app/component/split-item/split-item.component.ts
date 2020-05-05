import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../service/inventory.service'
import { MenuItem } from 'primeng/api';
import { Item } from 'src/app/model';
import { HttpClientService } from '../../service/http-client.service'

@Component({
  selector: 'app-split-item',
  templateUrl: './split-item.component.html',
  styleUrls: ['./split-item.component.scss']
})
export class SplitItemComponent implements OnInit {

  public breadcrumbArray: MenuItem[];
  public item: Item;
  public items: Item[];

  condition: string;
  originQuantity : Number; 
  categoryPath: string;
  public itemId: string;
  public departmentID: string;
  public categoryID: string;
  public subcategoryID: string;


  constructor(public route: ActivatedRoute,
    public router: Router,
    public httpClientService : HttpClientService, 
    public service: InventoryService) { 
  }

  ngOnInit() {
    var departmentName: string;
    var categoryName: string;
    var subcategoryName: string;
    this.parseURL();
    this.item = new Item();

    this.httpClientService.getDepartment(this.departmentID).subscribe(
      response =>{
        departmentName = response.body["name"];
        this.httpClientService.getSpecificCategory(this.categoryID).subscribe(
          response => { 
            categoryName = response.body["name"];
            this.httpClientService.getSpecificCategory(this.subcategoryID).subscribe(
              response =>{
                subcategoryName = response.body["name"];
                
                this.httpClientService.getItemByID(this.itemId).subscribe(
                  response => {
                    
                    this.item.id = response.body["id"]
                    this.item.description = response.body["description"]
                    this.item.quantity = response.body["quantity"]
                    this.item.price = response.body["price"]
                    this.item.condition = response.body["condition"]["id"]
                    this.condition = response.body["condition"]["condition"]
                    this.originQuantity = this.item.quantity
                    this.categoryPath = departmentName +' > '+categoryName+' > '+subcategoryName;
                    this.items = []
                    this.items.push(this.item)
                  })
              })   
          })
      })
    
  }

  parseURL(){
    var currentURL = this.route.url;
    const subscribe = currentURL.subscribe(
      val => {
        this.categoryID = val[2].path;
        this.departmentID = val[1].path; 
        this.subcategoryID = val[3].path;
        this.itemId = val[4].path;
      } 
  )}

  cloneItem(i){
    if(this.items[i].quantity > 1){
      let newItem = Object.assign({},this.items[i]);
      newItem.quantity = 1;
      this.items.push(newItem);
      this.items[i].quantity -= newItem.quantity;
    }
  }
  adjustQuantity(i, newQuantity:number){
    
    if((Number(this.items[i-1].quantity) + Number(this.items[i].quantity) - newQuantity > 0)&& i!=0){
      this.items[i-1].quantity = Number(this.items[i-1].quantity) + Number(this.items[i].quantity) - newQuantity;
      this.items[i].quantity = newQuantity;
    }
  }

  backToItemList(){
    this.router.navigateByUrl('/department/'+this.departmentID+'/'+this.categoryID+'/'+this.subcategoryID+'/');
  }

  sendSplitItemToBackEnd(){
    for(var i in this.items){
      if(i==="0"){

        let postBody = {
          description: this.items[i].description,
          quantity : this.items[i].quantity,
          price : this.items[i].price,
          condition : this.conditionNumberToString(Number(this.items[i].condition)),
          reason: "Other",
        //  comment: "Split Item"
        };
        this.httpClientService.editItem(this.itemId, JSON.stringify(postBody)).subscribe(response=>{
          console.log(response.body);
        });
      }else{
        let postBody = {
          description: this.items[i].description,
          quantity: this.items[i].quantity,
          condition: this.conditionNumberToString(Number(this.items[i].condition)),
          price: this.items[i].price,
          did: this.departmentID,
          cid: this.categoryID,
          scid: this.subcategoryID,
        };
    
        this.httpClientService.addItem(JSON.stringify(postBody)).subscribe(response => {
          console.log(response);
        })
      }

    }
    this.router.navigateByUrl('/department/'+this.departmentID+'/'+this.categoryID+'/'+this.subcategoryID+'/'+this.itemId);
  }

  private conditionNumberToString(conditionNumber: number){
    let temp : string;
    switch(conditionNumber){
      case 0: temp = "Broken"; break;
      case 1: temp = "Bad"; break;
      case 2: temp = "Average"; break;
      case 3: temp = "Good"; break;
      case 4: temp = "New"; break;
    }
    return temp
  }
   
}
