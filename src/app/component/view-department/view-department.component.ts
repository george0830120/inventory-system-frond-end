import { Component, OnInit } from "@angular/core";

// /user:id/Department -> user id for identifying privilege
import { ActivatedRoute } from "@angular/router";
import { WebSocketService } from "../../service/web-socket.service";
import { StartInteractionService } from "./services/start-interaction.service";
import { ViewDepartmentService } from "./services/view-department.service";
import { ViewDepartmentOutputService } from "./services/view-department-output.service";

export class IDepartment {
  constructor(public name: string) { }
}

@Component({
  selector: "app-view-department",
  templateUrl: "./view-department.component.html",
  styleUrls: ["./view-department.component.scss"]
})
export class MainComponent implements OnInit {
  // public departments: JSON;
  public departments: { name: string, id: string }[];
  public i = 0;
  constructor(
    public route: ActivatedRoute,
    public webSocketService: WebSocketService,
    public startInteractionService: StartInteractionService, // startInteractionPort
    public viewDepartmentService: ViewDepartmentService, // pageInteractionPort
    public viewDepartmentOutputService: ViewDepartmentOutputService // outputPort
  ) { }

  ngOnInit() {
    this.departments = [];
  }
  handle(response) {
    response.foreach(depObject => this.departments.push(depObject))
  }
}
