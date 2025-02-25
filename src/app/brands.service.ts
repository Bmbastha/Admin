import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root', // This makes the service available app-wide
})
export class BrandsService {
 private baseUrl = environment.serverUrl; // Base URL for the API

  constructor(private http: HttpClient) {}

  // Method to add a new brand
  addBrand(brand: { name: string; images: string[] }): Observable<any> {
     const url = `${this.baseUrl}/api/admin/item/brand`;
    return this.http.put(url, brand);
  }
}
