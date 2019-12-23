import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InventoryService } from '../../service/inventory.service';
import { Location } from '@angular/common';
import {HttpClientService} from '../../service/http-client.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  public addDepartmentForm: any;
  constructor(
    public formBuilder: FormBuilder,
    public service: InventoryService,
    public location: Location,
    public httpClientService: HttpClientService
  ) {
    this.addDepartmentForm = this.formBuilder.group({
      name: '',
      description: '',
      posDepartmentCode: '',
      uniqueTag: '',
    });
  }

  save(data) {
    console.log(data);
    let postBody = {
      name : data['name'],
      description: data['description'],
      code: data['posDepartmentCode'],
      tag: data['uniqueTag']
    }
    this.httpClientService.addDepartment(JSON.stringify(postBody)).subscribe((res)=> {
      console.log(res);
    })
    // this.httpClientService.addDepartment(data).subscribe(response => this.handle(response));
  }

  handle(response){
    console.log("start to add departments...");
  }
  cancel() {
    this.location.back();
  }

  ngOnInit() {
  }

}
