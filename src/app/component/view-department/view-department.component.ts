import { Component, OnInit } from "@angular/core";

// /user:id/Department -> user id for identifying privilege
import { ActivatedRoute } from "@angular/router";
import { HttpClientService } from "../../service/http-client.service";
import { LoginService } from "../../service/login.service";
import { WebSocketService } from "../../service/web-socket.service";
import { StartInteractionService } from "./start-interaction.service";

export class IDepartment {
  constructor(public name: string) { }
}

@Component({
  selector: "app-view-department",
  templateUrl: "./view-department.component.html",
  styleUrls: ["./view-department.component.scss"]
})
export class ViewDepartmentComponent implements OnInit {
  // public departments: JSON;
  public departments: { name: string, id: string }[];
  public i = 0;
  constructor(
    public route: ActivatedRoute,
    public httpClientService: HttpClientService,
    public loginService: LoginService,
    public webSocketService: WebSocketService,
    public startInteractionService: StartInteractionService
  ) { }

  ngOnInit() {
    this.departments = [];
    this.httpClientService.getDepartments().subscribe(response => {
      console.log(response.body);
      for (var x in response.body) {
        this.departments.push({ name: response.body[x]["name"], id: response.body[x]["id"] })
      }
    });
  }
  handle(response) {
    response.foreach(depObject => this.departments.push(depObject))
  }
}
