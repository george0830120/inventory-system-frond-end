import { Component, OnInit } from '@angular/core';

// /user:id/Department -> user id for identifying privilege
import { Router, ActivatedRoute } from '@angular/router';
import { dummyTestData } from '../../testData-Inventory';
import { Observable } from 'rxjs';
import { InventoryService } from '../../service/inventory.service';
import {HttpClientService} from '../../service/http-client.service';

export class IDepartment {
  constructor(
    public name: string,
  ) {}
}

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.scss']
})
export class ViewDepartmentComponent implements OnInit {
  public departments: JSON;
  public i = 0;
  constructor(private route: ActivatedRoute, private service: InventoryService, private httpClientService: HttpClientService) {
  }

  ngOnInit() {
    this.httpClientService.getDepartments().subscribe(response => this.handle(response));

  }
  handle(response) {
    this.i = this.i + 1;
    this.departments = response;
    console.log(this.departments);
  }


}
