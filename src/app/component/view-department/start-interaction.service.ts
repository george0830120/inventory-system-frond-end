import { Injectable } from "@angular/core";
import { WebSocketService } from "../../service/web-socket.service";
import { BPEL_WSDL_INFO } from "./wsdlbpelPath";
import * as globalParams from "../../global.params";

@Injectable({
    providedIn: 'root'
})
export class StartInteractionService {

    private _portType = { "local_name": ["navigationPort", "startInteractionPort"] };
    constructor(private webSocketService: WebSocketService) {
        this.webSocketService.getSubject().subscribe(
            data => {
                if (data.hasOwnProperty("portType") && this._portType["local_name"].indexOf(data['portType']["local_name"]) > -1) {
                    if (data.hasOwnProperty("notification") && data["notification"] === "READY") {
                        globalParams.routingInvoker[data["operation"]] = data;
                    }
                }
            }
        );
        console.log("startInteraction port");
        // start main bpel
        this.sendMessage(JSON.stringify(BPEL_WSDL_INFO));
    }

    sendMessage(message: string) {
        this.webSocketService.sendMessage(message);
    }
}