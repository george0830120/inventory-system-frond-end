import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { WebSocketService } from '../../service/web-socket.service';
import { AddDepartmentService } from './services/add-department.service';
import { AddDepartmentOutputService } from './services/add-department-output.service';
import { StartInteractionService } from './services/start-interaction.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  public addDepartmentForm: any;
  constructor(
    public formBuilder: FormBuilder,
    public location: Location,
    public webSocketService: WebSocketService,
    public startInteractionService: StartInteractionService, // portType: startInteraction
    public addDepartmentService: AddDepartmentService, // portType: pageIneraction
    public addDepartmentOutputService: AddDepartmentOutputService // portType: output
  ) {
    this.addDepartmentForm = this.formBuilder.group({
      name: '',
      description: '',
      posDepartmentCode: '',
      uniqueTag: '',
    });
  }

  save(data) {
    let postBody = {
      name : data['name'],
      description: data['description'],
      code: data['posDepartmentCode'],
      tag: data['uniqueTag']
    }
    this.addDepartmentService.sendMessage(postBody)
  }

  cancel() {
    this.location.back();
  }

  ngOnInit() {
    // this.webSocketService.reconnection();
  }

}
