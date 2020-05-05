import { Component, OnInit } from '@angular/core';
import { AcquisitionService } from '../../service/acquisition.service';
import { ActivatedRoute } from '@angular/router';
import { Acquisition } from '../../model/acquisition.model';
import { HttpClientService } from '../../service/http-client.service';
import { Item } from 'src/app/model';


@Component({
  selector: 'app-receive-acquisition',
  templateUrl: './receive-acquisition.component.html',
  styleUrls: ['./receive-acquisition.component.scss']
})
export class ReceiveAcquisitionComponent implements OnInit {
  public acquisitionId: string;
  public acquisition: Acquisition;

  constructor(public route: ActivatedRoute,public service: AcquisitionService, public httpService: HttpClientService) { }

  ngOnInit() {
    this.acquisition = new Acquisition();
    let currentUrl = this.route.url;
    currentUrl.subscribe({
      next: val => {
        this.acquisitionId = val[1].path;
      }
    })

    this.httpService.getAcquisition(this.acquisitionId).subscribe(response => {
      this.acquisition = ({id:response.body["id"], 
                          type:response.body["type"]["id"],
                          donor:response.body["donor"],
                          contact:response.body["contact"],
                          phone:response.body["phone"],
                          date:response.body["date"],
                          status:response.body["status"]["id"],
                          items:null});
      this.httpService.getItemsUnderAcquisition(this.acquisitionId).subscribe(response => {
        this.acquisition.items = [];
        for(var x in response.body){
          this.acquisition.items.push({name:response.body[x]["description"],
                                      department:"",
                                      category:"",
                                      description:"",
                                      condition:response.body[x]["condition"],
                                      id:response.body[x]["id"],
                                      price:response.body[x]["price"],
                                      quantity:response.body[x]["quantity"]});
        }
      });
    });
  }

}
