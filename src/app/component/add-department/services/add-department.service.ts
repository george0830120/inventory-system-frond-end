// portType : pageInteraction
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { WebSocketService } from "../../../service/web-socket.service";
import * as globalParams from "../resources/global.params";

@Injectable({
    providedIn: 'root'
})
export class AddDepartmentService {
    pid: string = null;
    private _portType = { "namespace": "./testdata/GetDepartments.bpel", "local_name": "pageInteractionPort" };
    private _partnerLink = "Main";
    private _startOperation = "start";

    operationStatus: BehaviorSubject<{}> = new BehaviorSubject<{}>({});

    constructor(private webSocketService: WebSocketService) {
        this.webSocketService.getSubject().subscribe(
            data => {
                if (data.hasOwnProperty("portType") && data['portType']["namespace"] === this._portType["namespace"]
                    && data['portType']["local_name"] === this._portType["local_name"]) {
                    this.pid = data["pid"];
                    if (data.hasOwnProperty("notification")) {
                        var stateData = this.operationStatus.getValue();
                        var op = data['operation'];
                        if (!(op in stateData)) {
                            stateData[op] = {};
                        }
                        stateData[op]["notification"] = data['notification'];
                        this.operationStatus.next(stateData);
                    }
                }
            }
        );
        this.startPage();
    }

    startPage() {
        if (!(this._startOperation in globalParams.routingInvoker)) {
            console.log("Service is not ready, wait for 1 sec.");
            setTimeout(() => this.startPage(), 1000);
            return;
        }
        let data = globalParams.routingInvoker[this._startOperation];
        let message = {};
        message["pid"] = data["pid"];
        message["partnerLink"] = data["partnerLink"];
        message["portType"] = data["portType"];
        message["operation"] = this._startOperation;
        message["content"] = "<var><start>true</start></var>";
        // this.sendMessage(JSON.stringify(message));
        this.webSocketService.sendMessage(JSON.stringify(message));
    }

    onMessage(message: {}) {
        message["pid"] = this.pid;
        message["portType"] = this._portType;
        message["partnerLink"] = this._partnerLink;
        this.sendMessage(JSON.stringify(message));
    }

    sendMessage(data: {}) {
        console.log("send message");
        let message = {};
        message["pid"] = this.pid;
        message["portType"] = this._portType;
        message["partnerLink"] = this._partnerLink;
        message["operation"] = this._startOperation;
        message["content"] = `
        <var>
            <uid>test1</uid>
            <token>test2</token>
            <name>${data["name"]}</name>
            <description>${data["description"]}</description>
            <POSCode>${data["code"]}</POSCode>
            <tag>${data["uniqueTag"]}</tag>
        </var>
        ` 
        // console.log(data);
        // console.log(message);
        this.webSocketService.sendMessage(JSON.stringify(message));
    }
}