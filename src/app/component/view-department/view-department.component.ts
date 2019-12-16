import { Component, OnInit } from '@angular/core';
import { Department } from '../../model/deaprtment.model';
// /user:id/Department -> user id for identifying privilege
import { Router, ActivatedRoute } from '@angular/router';
import { dummyTestData } from '../../testData-Inventory';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.scss']
})
export class ViewDepartmentComponent implements OnInit {
  private departments: Department[];
  private currentUrl: string;

  constructor(private route: ActivatedRoute) {
    this.departments = dummyTestData.Deaprtments;
    console.log(this.departments);
  }

  ngOnInit() {
    
  }

}
