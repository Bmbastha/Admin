import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  
  private baseUrl = environment.serverUrl; // The base URL is stored in the environment file.

  constructor(private http: HttpClient) {}

  addBanner(payload: { title: string; banner_image: string }): Observable<any> {
    const url = `${this.baseUrl}/api/admin/banner/add`; // Append the endpoint to the base URL.
    return this.http.put(url, payload);
  }
}
