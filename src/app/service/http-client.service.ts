import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface IDepartment {
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getDepartments() {
    return this.httpClient.get('http://localhost:8080/department', {responseType: 'json'} );
  }
}
