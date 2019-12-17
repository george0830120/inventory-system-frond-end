import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InventoryService } from '../../service/inventory.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  private addDepartmentForm: any;
  constructor(
    private formBuilder: FormBuilder,
    private service: InventoryService,
    private location: Location
  ) {
    this.addDepartmentForm = this.formBuilder.group({
      name: '',
      description: '',
      posDepartmentCode: '',
      uniqueTag: '',
    })
  }

  save(data) {
    console.log(data);
  }

  cancel() {
    this.location.back();
  }

  ngOnInit() {
  }

}
