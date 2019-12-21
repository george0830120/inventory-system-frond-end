import { Component, OnInit } from '@angular/core';
import { AcquisitionService } from '../../service/acquisition.service';
import { ActivatedRoute } from '@angular/router';
import { Acquisition } from '../../model/acquisition.model';

@Component({
  selector: 'app-receive-acquisition',
  templateUrl: './receive-acquisition.component.html',
  styleUrls: ['./receive-acquisition.component.scss']
})
export class ReceiveAcquisitionComponent implements OnInit {
  public acquisitionId: string;
  public acquisition: Acquisition;

  constructor(public route: ActivatedRoute,public service: AcquisitionService) { }

  ngOnInit() {
    let currentUrl = this.route.url;
    currentUrl.subscribe({
      next: val => {
        console.log(val);
        this.acquisitionId = val[1].path;
      }
    })
    console.log(this.acquisitionId);
    this.acquisition = this.service.getAcqusitionById(this.acquisitionId);
    console.log(this.acquisition);
  }

}
