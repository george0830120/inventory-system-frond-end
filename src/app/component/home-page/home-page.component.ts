import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../service/inventory.service'


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private inventoryService: InventoryService;
  constructor(inventoryService: InventoryService) { 
      this.inventoryService = inventoryService;
  }

  test(){
    console.log(this.inventoryService.getDepartments());
  }

  pushDepartment(){
    this.inventoryService.getDepartmentByName("Vehicle").subscribe(
      val => console.log(val)      
    );  
  }

  ngOnInit() {
  }

}
