import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../service/inventory.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  private inventoryService: InventoryService;
  constructor(inventoryService: InventoryService,private router: Router) { 
      this.inventoryService = inventoryService;
  }

  test(){
    console.log(this.inventoryService.getDepartments());
    console.log(this.router)
  }

  pushDepartment(){
    this.inventoryService.getDepartmentByName("Vehicle").subscribe(
      val => console.log(val)      
    );  
  }

  ngOnInit() {
  }

}
