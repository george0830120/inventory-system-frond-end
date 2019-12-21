import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: "root"
})
export class WebSocketService {
  ws: WebSocket;
  observable: Observable<any>;
  subject: Subject<any>;
  connectionID: number;

  constructor() {
    this.ws = new WebSocket("ws://localhost:3000");
    this.observable = this.createObservableSocket();
    this.subject = new Subject<any>();
    this.observable.subscribe(this.subject);
    this.connectionID = null;
  }

  public createObservableSocket(): Observable<any> {
    return new Observable(observer => {
      this.ws.onmessage = event => {
        console.log("[WebSocketService] Received:", event.data);
        let jsonObj = JSON.parse(event.data);
        // establish connection
        if (
          jsonObj.hasOwnProperty("notification") &&
          jsonObj["notification"] === "CONNECTIONREADY"
        ) {
          this.connectionID = jsonObj["cid"];
          console.log("connection ready");
          this.ws.send("testing");
        }
        // after connection
        else {
          console.log("gogogo");
          console.log(jsonObj);
          observer.next(jsonObj);
        }
      };
      this.ws.onerror = event => {
        console.log("[WebSocketService] Received Error:", event);
        observer.error(event);
      };
      this.ws.onclose = () => {
        observer.complete();
        console.log("[WebSocketService] ws closed");
      };
      this.ws.onopen = () => {
        console.log("[WebSocketService]ws opened");
        this.ws.send("Hello");
      } 
    });
  }

  getSubject(): Subject<any> {
    return this.subject;
  }

  sendMessage(message: any) {
    if (this.connectionID) {
      this.ws.send(message);
      console.log("[WebSocketService] Sent:", message);
    }
  }
}
