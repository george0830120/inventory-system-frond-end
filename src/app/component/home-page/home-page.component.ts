import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../service/inventory.service';
import { Router } from '@angular/router';
import { LoginService } from'../../service/login.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  constructor(
    private inventoryService: InventoryService,
    private loginService: LoginService) {

  }

  ngOnInit() {
  }

}
