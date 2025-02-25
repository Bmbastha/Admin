import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private baseUrl = environment.serverUrl;

  constructor(private http: HttpClient) {}

  // Method to send the item to the backend
  addItem(requestBody: any) {
    const url = `${this.baseUrl}/api/admin/item/add`;
    return this.http.put(url, requestBody);
  }
  getSuppliers(): Observable<any> {
    const url = `${this.baseUrl}/api/admin/item/supplier`; // Ensure this is the correct URL to fetch suppliers
    return this.http.get(url);
  }
  getItems(limit: number = 20, offset: number = 0, searchText: string = ''): Observable<any> {
  const url = `${this.baseUrl}/api/admin/item/`;
  return this.http.get(url);
}
getSubItemDetails(itemId: number): Observable<any> {
  const url = `${this.baseUrl}/api/admin/item/details/${itemId}`;
  return this.http.get(url);
}
updateSubItem(requestBody: any): Observable<any> {
  const url = `${this.baseUrl}/api/admin/item/update/sub_item`;
  return this.http.patch(url, requestBody);  // Use PUT or PATCH depending on your backend API
}
  addPincode(requestBody: any): Observable<any> {
    const url = `${this.baseUrl}/api/admin/item/pincode`;
    return this.http.put(url, requestBody);
  }
  removePincode(requestBody: any): Observable<any> {
  const url = `${this.baseUrl}/api/admin/item/pincode`;
  return this.http.request('DELETE', url, { body: requestBody });
}
getPincodes(): Observable<any> {
  const url = `${this.baseUrl}/api/admin/pincode/`;
  return this.http.get(url);
}


}
