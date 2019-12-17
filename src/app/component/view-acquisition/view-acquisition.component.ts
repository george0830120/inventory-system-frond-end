import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-view-acquisition',
  templateUrl: './view-acquisition.component.html',
  styleUrls: ['./view-acquisition.component.scss']
})
export class ViewAcquisitionComponent implements OnInit {
  private acquisitionTypes : SelectItem[];
  private acquisitionStatus : SelectItem[];
  private checkSearchForm: any;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.acquisitionTypes = [
      {label:"Drop off",value:{type:"Drop off",value:1}},
      {label:"Pick up",value:{type:"Pick up",value:2}},
      {label:"Decon",value:{type:"Decon",value:3}},
    ]
    this.acquisitionStatus = [
      {label:"Expected",value:{type:"Expected",value:1}},
      {label:"Partially Received",value:{type:"Partially Received",value:2}},
      {label:"Completed",value:{type:"Completed",value:3}},
    ]

    this.checkSearchForm = this.formBuilder.group({
      acquisition:'',
      name:'',
      type:0,
      phone:'',
      status:0
    })
   }

  search(data) {
    console.log(data);
  }
  
  ngOnInit() {
  }

}
