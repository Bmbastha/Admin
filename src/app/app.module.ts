import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BannersComponent } from './banners/banners.component';
import { BrandsComponent } from './brands/brands.component';
import { PromotiongifComponent } from './promotiongif/promotiongif.component';
import { OverviewComponent } from './overview/overview.component';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HelpcenterComponent } from './helpcenter/helpcenter.component';
import { ItemsComponent } from './items/items.component';
import { NotificationComponent } from './notification/notification.component';
import { LoginComponent } from './login/login.component'
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './auth.interceptor';
import { AddSubItemsComponent } from './add-sub-items/add-sub-items.component';
import { EditsubitemsComponent } from './editsubitems/editsubitems.component';
import { DeliveryComponent } from './delivery/delivery.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    BannersComponent,
    BrandsComponent,
    PromotiongifComponent,
    OverviewComponent,
    HelpcenterComponent,
    ItemsComponent,
    NotificationComponent,
    LoginComponent,
    AddSubItemsComponent,
    EditsubitemsComponent,
    DeliveryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
     HttpClientModule
   
  
    
    
  ],
  providers: [
    CookieService, // Provide the CookieService
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Ensures multiple interceptors can be used
    }
     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
