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

  addDepartment(data: JSON) {
    return this.httpClient.post('http://localhost:3000/hierarchy/departments', data,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  getDepartment(departmentID: string) {
    return this.httpClient.get('http://localhost:3000/hierarchy/departments' + departmentID,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  editDepartment(departmentID: string, data: JSON) {
    return this.httpClient.patch('http://localhost:3000/hierarchy/departments' + departmentID, data,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  deleteDepartment(departmentID: string) {
    return this.httpClient.patch('http://localhost:3000/hierarchy/departments' + departmentID,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  getCategories(departmentID: string) {
    return this.httpClient.get('http://localhost:3000/hierarchy/departments/' + departmentID + 'categories',
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  addCategory(departmentID: string, data: JSON) {
    return this.httpClient.post('http://localhost:3000/hierarchy/departments/' + departmentID + 'categories', data,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  getCategory(categoryID: string) {
    return this.httpClient.get('http://localhost:3000/hierarchy/categories/' + categoryID,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  editCategory(categoryID: string, data: JSON) {
    return this.httpClient.patch('http://localhost:3000/hierarchy/categories/' + categoryID, data,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  deleteCategory(categoryID: string) {
    return this.httpClient.delete('http://localhost:3000/hierarchy/categories/' + categoryID,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  getSubCategories(categoryID: string) {
    return this.httpClient.get('http://localhost:3000/hierarchy/categories/' + categoryID + 'subcategories',
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  addSubCategory(categoryID: string, data: JSON) {
    return this.httpClient.post('http://localhost:3000/hierarchy/categories/' + categoryID + 'subcategories', data,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  getAllItems() {
    return this.httpClient.get('http://localhost:3000/items',
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  // generic items
  getDepartementItems(departmentID: string) {
    return this.httpClient.get('http://localhost:3000/hierarchy/leaf/' + departmentID,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  getDepartmentSubtrees(departmentID: string) {
    return this.httpClient.get('http://localhost:3000/hierarchy/subtree/' + departmentID,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  getCategoryItems(departmentID: string, categoryID: string) {
    return this.httpClient.get('http://localhost:3000/hierarchy/leaf/' + departmentID + '/' + categoryID,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  getCategorySubtrees(departmentID: string, categoryID: string) {
    return this.httpClient.get('http://localhost:3000/hierarchy/subtree/' + departmentID + '/' + categoryID,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  getSubCategoryItems(departmentID: string, categoryID: string, subCategoryID: string) {
    return this.httpClient.get('http://localhost:3000/hierarchy/leaf/' + departmentID + '/' + categoryID + '/' + subCategoryID,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  getSubCategorySubtrees(departmentID: string, categoryID: string, subCategoryID: string) {
    return this.httpClient.get('http://localhost:3000/hierarchy/subtree/' + departmentID + '/' + categoryID + '/' + subCategoryID,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  getItemByID(id: string){
    return this.httpClient.get('http://localhost:3000/items/' + id,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  addItem(data: JSON){
    return this.httpClient.post('http://localhost:3000/items/', data,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  editItem(id: string){
    return this.httpClient.patch('http://localhost:3000/items/' + id,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  getAcquisitions(){
    return this.httpClient.get('http://localhost:3000/acquisitions/',
    { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
  );
  }

  getAcquisition(id:string){
    return this.httpClient.get('http://localhost:3000/acquisitions/' + id,
      { headers: new HttpHeaders().set('Content-Type', 'application/json'), observe: 'response', withCredentials:true }
    );
  }

  getSubcategoriesbyCategoryID(categoryID: string) {
    return this.httpClient.get('http://localhost:3000/hierarchy/categories/'+ categoryID+'/subcategories',
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
