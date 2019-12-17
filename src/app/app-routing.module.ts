import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./component/page-not-found/page-not-found.component";
import { LoginComponent } from "./component/login/login.component";
import { HomePageComponent } from "./component/home-page/home-page.component";
import { ViewDepartmentComponent } from "./component/view-department/view-department.component";
import { ViewCategoryComponent } from "./component/view-category/view-category.component";
import { ViewSubcategoryComponent } from "./component/view-subcategory/view-subcategory.component";
import { ViewItemListComponent } from "./component/view-item-list/view-item-list.component";
import { ViewAcquisitionComponent } from "./component/view-acquisition/view-acquisition.component";
import { AddItemComponent } from "./component/add-item/add-item.component";
import { UpdateItemComponent } from './component/update-item/update-item.component'

const routes: Routes = [
  { path: 'department/:id/:id/:id/addItem', component: AddItemComponent },
  { path: 'department/:id/:id/:id/:id', component: UpdateItemComponent},
  { path: 'department/:id/:id/:id', component: ViewItemListComponent },
 // { path: 'department/:id/viewCategory/:id/itemList', component: ViewItemListComponent },
  { path: 'department/:id/:id', component: ViewSubcategoryComponent },
  { path: 'department/:id', component: ViewCategoryComponent },
  { path: 'departments', component: ViewDepartmentComponent },
  { path: 'acqusition', component: ViewAcquisitionComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: '', 
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: "department/:id/viewCategory", component: ViewCategoryComponent },
  { path: "department", component: ViewDepartmentComponent },
  { path: "home", component: HomePageComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
