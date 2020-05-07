// outputport
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { WebSocketService } from "../../../service/web-socket.service";

@Injectable({
    providedIn: 'root'
})
export class AddDepartmentOutputService {

    private _portType: {} = { "local_name": "outputPort" };
    operationStatus: BehaviorSubject<{}> = new BehaviorSubject<{}>(
        {}
    );

    constructor(private webSocketService: WebSocketService) {
        this.webSocketService.getSubject().subscribe(
            data => {
                if (data.hasOwnProperty("portType") && data['portType']["local_name"] === this._portType["local_name"]) {
                    var stateData = this.operationStatus.getValue();
                    var op = data['operation'];
                    if (!(data['operation']! in stateData)) {
                        stateData[op] = {}
                    }
                    stateData[op]["content"] = data['content'];
                    this.operationStatus.next(stateData);
                }
            }
        )
    }
}