import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent { 
  constructor(private router: Router, private cookieService: CookieService) {}

  logout(): void {
    // Clear the auth token from cookies
    this.cookieService.delete('auth_token');
    
    // Navigate to the login page
    this.router.navigate(['/login']);
  }

}
