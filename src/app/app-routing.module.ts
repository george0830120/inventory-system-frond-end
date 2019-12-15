import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { LoginComponent } from './component/login/login.component';
import { HomePageComponent } from './component/home-page/home-page.component'
import { ViewDepartmentComponent } from './component/view-department/view-department.component';
import { ViewCategoryComponent } from './component/view-category/view-category.component';
import { ViewSubcategoryComponent } from './component/view-subcategory/view-subcategory.component';
import { ViewItemListComponent } from './component/view-item-list/view-item-list.component';
import { ViewAcqusitionComponent } from './component/view-acqusition/view-acqusition.component';


const routes: Routes = [
  { path: 'department/:id/viewCategory/:id/viewSubcategory/:id/itemList', component: ViewItemListComponent },
  { path: 'department/:id/viewCategory/:id/itemList', component: ViewItemListComponent },
  { path: 'department/:id/viewCategory/:id/viewSubcategory', component: ViewSubcategoryComponent },
  { path: 'department/:id/viewCategory', component: ViewCategoryComponent },
  { path: 'department', component: ViewDepartmentComponent },
  { path: 'acqusition', component: ViewAcqusitionComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: '', 
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
