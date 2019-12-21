import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Acquisition } from '../model/acquisition.model';
import { fakeAcquisitions } from '../testAcquisitionData';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class AcquisitionService {
  private acquisitions: BehaviorSubject<Acquisition[]>;

  constructor(
    private webSocketService: WebSocketService
  ) {
    this.acquisitions = new BehaviorSubject<Acquisition[]>(null);
    let acquisitionsArray = [];
    fakeAcquisitions.acquisitions.forEach(element => {
      acquisitionsArray.push(element);
    });
    this.acquisitions.next(acquisitionsArray);
    this.webSocketService.getSubject().subscribe(data => {
      console.log("receive data from subject");
      console.log(data);
    })
  }
  getAcquisitions() {
    return this.acquisitions;
  }

  getAcqusitionById(id: string) {
    let acq: Acquisition[] ;
    acq = [];
    this.acquisitions.subscribe(
      (element) => element.filter(e => e.id === id)
      .forEach(e => acq.push(e))
    );
    return acq[0];
  }

  sendMessage(message: string) {
    this.webSocketService.sendMessage(message);
  }
}
