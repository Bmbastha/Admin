import { Component } from '@angular/core';
import { BannersComponent } from '../banners/banners.component';
import { BrandsComponent } from '../brands/brands.component';
import { OverviewComponent } from '../overview/overview.component';
import { PromotiongifComponent } from '../promotiongif/promotiongif.component';
import { HelpcenterComponent } from '../helpcenter/helpcenter.component';
import { ItemsComponent } from '../items/items.component';
import { NotificationComponent } from '../notification/notification.component';
import { DeliveryComponent } from '../delivery/delivery.component';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isSidebarOpen: boolean = true;  
  activeMenu: string = '';        
  activeComponent: any = null;     // Dynamic component reference

  toggleSidebar(menu: string): void {
    //  toggle sidebar visibility
    if (this.activeMenu === menu && this.isSidebarOpen) {
      this.isSidebarOpen = true;
    } else {
      
      this.activeMenu = menu;
      this.isSidebarOpen = true;
    }
  }

  setActiveComponent(component: string): void {
    // Set the active component 
      console.log('Setting active component to:', component); 
    if (component === 'banners') {
      this.activeComponent = BannersComponent;
       this.isSidebarOpen = true;
    } else if (component === 'brands') {
      this.activeComponent = BrandsComponent;
       this.isSidebarOpen = true;
    }
    else if (component === 'overview'){
      this.activeComponent = OverviewComponent;
       this.isSidebarOpen = true;
    }
    else if (component === 'promotionalgifs'){
      this.activeComponent = PromotiongifComponent;
       this.isSidebarOpen = true;
    }
    else if (component === 'helpcenter') {
    this.activeComponent = HelpcenterComponent;
     this.isSidebarOpen = true;
  }
   else if (component === 'items') {
    this.activeComponent = ItemsComponent; 
     this.isSidebarOpen = true;
  }
  else if (component === 'notification') {
    this.activeComponent = NotificationComponent; 
     this.isSidebarOpen = true;
  }
  else if (component === 'delivery') {
    this.activeComponent = DeliveryComponent; 
     this.isSidebarOpen = true;
  }
  }
}
