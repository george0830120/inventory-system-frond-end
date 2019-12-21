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
import { ReceiveAcquisitionComponent } from "./component/receive-acquisition/receive-acquisition.component";
import { AddItemComponent } from "./component/add-item/add-item.component";
import { UpdateItemComponent } from './component/update-item/update-item.component'
import { AddDepartmentComponent } from "./component/add-department/add-department.component";
import {EditCategoryComponent} from './component/edit-category/edit-category.component';
import {MoveCategoryComponent} from './component/move-category/move-category.component';
import {AddUniqueItemComponent} from './component/add-unique-item/add-unique-item.component';
import { AuthGuard }                from './service/auth-gaurd.service';

const routes: Routes = [
  { path: 'department/:id/addUniqueItem', component: AddUniqueItemComponent },
  { path: 'department/:id/moveCategory', component: MoveCategoryComponent },
  { path: 'department/:id/editCategory', component: EditCategoryComponent },
  { path: 'department/addDepartment', component: AddDepartmentComponent },
  { path: 'department/:id/:id/:id/addItem', component: AddItemComponent },
  { path: 'department/:id/:id/:id/:id', component: UpdateItemComponent},
  { path: 'department/:id/:id/:id', component: ViewItemListComponent },
 // { path: 'department/:id/viewCategory/:id/itemList', component: ViewItemListComponent },
  { path: 'department/:id/:id', component: ViewSubcategoryComponent },
  { path: 'department/:id', component: ViewCategoryComponent },
  { path: 'department', component: ViewDepartmentComponent },
  { path: 'acquisition', component: ViewAcquisitionComponent },
  { path: 'home', component: HomePageComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'acquisition/:id', component: ReceiveAcquisitionComponent},
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: "department/:id/viewCategory", component: ViewCategoryComponent },
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
