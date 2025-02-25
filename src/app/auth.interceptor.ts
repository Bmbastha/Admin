import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {} // Inject Cookie service

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve token from cookie storage
    const token = this.cookieService.get('auth_token'); 

    if (token) {
     
      req = req.clone({
        setHeaders: {
          Authorization: token 
        }
      });
    }

    
    return next.handle(req);
  }
}
