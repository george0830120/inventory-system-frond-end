import { Component, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api";
import { FormBuilder } from "@angular/forms";
import { Acquisition } from "../../model/acquisition.model";
import { AcquisitionService } from "../../service/acquisition.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-acquisition",
  templateUrl: "./view-acquisition.component.html",
  styleUrls: ["./view-acquisition.component.scss"]
})
export class ViewAcquisitionComponent implements OnInit {
  private acquisitionTypes: SelectItem[];
  private acquisitionStatus: SelectItem[];
  private checkSearchForm: any;
  private acquisitions: Acquisition[];
  private showAcquisitions: Acquisition[];
  private isSearch: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: AcquisitionService,
    private router: Router
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
    this.service.getAcquisitionFromCRM().subscribe(acq => {
      console.log("component get from service");
      console.log(acq);
      if(acq) {
        setTimeout(() => {
          this.acquisitions.push(acq);
        },5000)
      }
    })
  }

  search(data) {
    console.log(data);
    console.log(JSON.stringify(data))
    if(data.acquisitionID != "" || data.name != "" || data.phone != "") {
      console.log("success");
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
    console.log("add Acquisition");
    window.open('http://localhost/CRM/Main.php','_blank');
  }

  ngOnInit() {
    this.acquisitions = [];
    this.service.getAcquisitions().subscribe( (acqs) => {
      this.acquisitions = acqs;
      // this.acquisitions.push(acq);
    })
    console.log(this.acquisitions);
  }
}
