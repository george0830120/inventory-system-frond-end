import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../service/inventory.service'


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  constructor(inventoryService: InventoryService) { 

  }

  ngOnInit() {
  }

}
