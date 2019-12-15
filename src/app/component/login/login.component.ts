import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../service/inventory.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private inventoryService;
  constructor(inventoryService: InventoryService) { 
      this.inventoryService = inventoryService;
  }

  ngOnInit() {
  }

}
