import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DropdownModule} from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccordionModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ScrollPanelModule } from "primeng/primeng";
import { TableModule } from 'primeng/table';
import { TabsModule } from "ngx-bootstrap";


import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { LoginComponent } from './component/login/login.component';
import { ViewDepartmentComponent } from './component/view-department/view-department.component';
import { ViewCategoryComponent } from './component/view-category/view-category.component';
import { ViewSubcategoryComponent } from './component/view-subcategory/view-subcategory.component';
import { ViewItemListComponent } from './component/view-item-list/view-item-list.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { InventoryService } from './service/inventory.service';
import { LoginService } from './service/login.service';
import { ViewAcquisitionComponent } from './component/view-acquisition/view-acquisition.component';
import { AddItemComponent } from './component/add-item/add-item.component';
import { AddDepartmentComponent } from './component/add-department/add-department.component';
import { UpdateItemComponent } from './component/update-item/update-item.component';
import { ReceiveAcquisitionComponent } from './component/receive-acquisition/receive-acquisition.component';
import { EditCategoryComponent } from './component/edit-category/edit-category.component';
import { MoveCategoryComponent } from './component/move-category/move-category.component';
import { AddUniqueItemComponent } from './component/add-unique-item/add-unique-item.component';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    ViewDepartmentComponent,
    ViewCategoryComponent,
    ViewSubcategoryComponent,
    ViewItemListComponent,
    HomePageComponent,
    ViewAcquisitionComponent,
    AddItemComponent,
    UpdateItemComponent,
    ReceiveAcquisitionComponent,
    AddDepartmentComponent,
    EditCategoryComponent,
    MoveCategoryComponent,
    AddUniqueItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    DropdownModule,
    BrowserAnimationsModule,
    FormsModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    ScrollPanelModule,
    TableModule,
    TabsModule.forRoot(),
    MatButtonModule,
    BreadcrumbModule,
    MatGridListModule,
    DropdownModule,
    MultiSelectModule
  ],
  providers: [ InventoryService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
