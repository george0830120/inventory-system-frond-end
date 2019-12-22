import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IDepartment {
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {

  option = { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response' }
  constructor(
    public httpClient: HttpClient
  ) {
  }

  getDepartments() {
    return this.httpClient.get('http://localhost:3000/hierarchy/departments',
    { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
    
  }

  getCategoriesbyDepartmentID(departmentID: string) {
    return this.httpClient.get('http://localhost:3000/hierarchy/departments/'+ departmentID+'/categories',
    { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }
  getsubcategories(subcategory: string) {
    return this.httpClient.get('http://localhost:8080/department/' + subcategory  , {responseType: 'json'} );
  }

  addDepartment(data) {
    return this.httpClient.post('http://localhost:8080/department/addDepartment', data  , {responseType: 'json'} );
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

  auth(userName:string, password:string){
      let postBody = JSON.stringify({
        "username": userName,
        "password": password
      })

      console.log(postBody)
      return this.httpClient.post('http://localhost:3000/auth/login',postBody, 
      { headers: new HttpHeaders({'Access-Control-Allow-Origin':'*'}).set('Content-Type', 'application/json'), observe: 'response', withCredentials:true}
      );
  }
}
