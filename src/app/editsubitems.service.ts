import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditsubitemsService {
  private baseUrl = environment.serverUrl;

  constructor(private http: HttpClient) {}

  // Fetch sub-item details using the item ID
  getSubItemDetails(itemId: number): Observable<any> {
    const url = `${this.baseUrl}/api/admin/item/details/${itemId}`;
    return this.http.get(url);
  }
}
