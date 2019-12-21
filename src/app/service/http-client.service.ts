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

  getCategories(category: string) {
    return this.httpClient.get('http://localhost:8080/department/' + category  , {responseType: 'json'} );
  }

  addItem(departmentname: string,
      categoryName: string,
      subCategoryName: string,
      name: string,
      description: string,
      quantity: number,
      condition: number,
      price: number
    ) {
      let postBody = {
        'departmentName' : departmentname,
        'categoryName' : categoryName,
        'subCategoryName' : subCategoryName,
        'name' : name,
        'description' : description,
        'quantity' : quantity,
        'condition' : condition,
        'price' : price
      }
      console.log("postBody");
      console.log(postBody);
      // return this.httpClient.post('http://localhost:8080/addItem',postBody);
  }
}
