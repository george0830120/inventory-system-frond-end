import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from '../../service/http-client.service';
import { SelectItem } from 'primeng/api';
import { Location } from '@angular/common'

@Component({
  selector: 'app-move-category',
  templateUrl: './move-category.component.html',
  styleUrls: ['./move-category.component.scss']
})
export class MoveCategoryComponent implements OnInit {
  // show in drop down and categories
  private categoriesToMove: SelectItem[];
  private categoriesSelected: SelectItem[];
  private departmentsSelected: SelectItem[];
  private moveCategoryForm: any;

  constructor(
    private router: Router,
    private service: HttpClientService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {

    this.categoriesToMove = [
      { label: "Drop off", value: { type: "Drop off", value: 1 } },
      { label: "Pick up", value: { type: "Pick up", value: 2 } },
      { label: "Decon", value: { type: "Decon", value: 3 } }
    ];
    this.categoriesSelected = [
      { label: "Expected", value: { type: "Expected", value: 1 } },
      { label: "Partially Received", value: { type: "Partially Received", value: 2 } },
      { label: "Completed", value: { type: "Completed", value: 3 } }
    ];

    this.departmentsSelected = [
      { label: "Expected", value: { type: "Expected", value: 1 } },
      { label: "Partially Received", value: { type: "Partially Received", value: 2 } },
      { label: "Completed", value: { type: "Completed", value: 3 } }
    ];

    this.moveCategoryForm = this.formBuilder.group({
      categoriesToMove:[],
      selectedDepartment:'',
      selectedCategory:''
    }); 

  }

  move(data) {
    console.log("move")
    console.log(data);
  }

  cancel() {
    console.log("cancel")
    this.location.back();
  }

  ngOnInit() {
  }

}
