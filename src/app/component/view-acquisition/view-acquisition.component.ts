import { Component, OnInit, SystemJsNgModuleLoader } from "@angular/core";
import { SelectItem } from "primeng/api";
import { FormBuilder } from "@angular/forms";
import { Acquisition } from "../../model/acquisition.model";
import { AcquisitionService } from "../../service/acquisition.service";
import { Router } from "@angular/router";
import { LoginService } from '../../service/login.service';
import { HttpClientService } from '../../service/http-client.service';

@Component({
  selector: "app-view-acquisition",
  templateUrl: "./view-acquisition.component.html",
  styleUrls: ["./view-acquisition.component.scss"]
})
export class ViewAcquisitionComponent implements OnInit {
  public acquisitionTypes: SelectItem[];
  public acquisitionStatus: SelectItem[];
  public checkSearchForm: any;
  public acquisitions: Acquisition[];
  public showAcquisitions: Acquisition[];
  public isSearch: boolean;
  public time:number;

  constructor(
    public formBuilder: FormBuilder,
    // public service: AcquisitionService,
    public router: Router,
    private loginService: LoginService,
    private httpService: HttpClientService
  ) {
    this.acquisitionTypes = [
      { label: "Drop off", value: { type: "Drop off", value: 1 } },
      { label: "Pick up", value: { type: "Pick up", value: 2 } },
      { label: "Decon", value: { type: "Decon", value: 3 } }
    ];
    this.acquisitionStatus = [
      { label: "Expected", value: { type: "Expected", value: 1 } },
      { label: "Partially Received", value: { type: "Partially Received", value: 2 } },
      { label: "Completed", value: { type: "Completed", value: 3 } }
    ];

    this.checkSearchForm = this.formBuilder.group({
      acquisitionID: "",
      name: "",
      type: 0,
      phone: "",
      status: 0
    });
    this.isSearch = false;
  }

  search(data) {
    if(data.acquisitionID != "" || data.name != "" || data.phone != "") {
      this.showAcquisitions = [];
      this.acquisitions.filter(acquisition => acquisition.id === data.acquisitionID 
        || acquisition.donor === data.name 
        || acquisition.phone === data.phone
        || acquisition.type === data.type
        || acquisition.status === data.status 
        ).forEach((acq) => this.showAcquisitions.push(acq));
      this.isSearch = true;
    }
    else {
      this.isSearch = false;
    }
  }

  addAcquisition() {
    this.time = 0;
    //polling once in 1 sec for 20 times
    let intervalID = setInterval(()=>{
      this.time += 1;
      let temp;
      console.log(this.time);
      this.httpService.getAcquisitions().subscribe((acqs) => {
        temp = acqs.body;
        console.log(temp.length);
        if(temp.length > this.acquisitions.length) {
          this.acquisitions = [];
          for(let index = 0;index < temp.length;index++) {
            this.acquisitions.push(temp[index])
          }
        }
      })
      if(this.time > 45) {
        clearInterval(intervalID);
      }

    },1000)
    window.open('http://localhost/CRM/Main.php','_blank');
  }

  ngOnInit() {
    this.acquisitions = [];

    let temp;
    this.httpService.getAcquisitions().subscribe((acqs) => {
      temp = acqs.body; 
 
      for(let index = 0;index < temp.length;index++) {
        this.acquisitions.push(temp[index])
      }
    })
  }
}
