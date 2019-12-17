import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InventoryService } from '../../service/inventory.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  private addDepartmentForm: any;
  constructor(
    private formBuilder: FormBuilder,
    private service: InventoryService
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
    console.log("cancel");
  }

  ngOnInit() {
  }

}
