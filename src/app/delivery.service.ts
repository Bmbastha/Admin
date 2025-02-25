import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private baseUrl = environment.serverUrl;

 constructor(private http: HttpClient) {}

  getOrders(url: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${url}`);
  }
   getAgents(url: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${url}`);
  }
   assignAgent(requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/delivery/admin/map/order/agent`, requestBody);
  }
  updateOrderStatus(requestBody: any) {
  return this.http.patch(`${this.baseUrl}/api/delivery/admin/order`, requestBody);
}
  getPincodeSuggestions(url: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${url}`);
  }
}
