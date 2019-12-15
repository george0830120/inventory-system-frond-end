import { Component, OnInit } from '@angular/core';
import { Department } from '../../model/deaprtment.model';
// /user:id/Department -> user id for identifying privilege
import { Router } from '@angular/router';
import { dummyTestData } from '../../testData-Inventory';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.scss']
})
export class ViewDepartmentComponent implements OnInit {
  private departments: Department[];
  private currentUrl: string;

  constructor(private router: Router) {
    this.departments = dummyTestData.Deaprtments;
    console.log(this.departments);
  }

  ngOnInit() {
    console.log(this.router.url);
    this.currentUrl = this.router.url;
  }

}
