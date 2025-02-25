import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubitemsService {
   private baseUrl = environment.serverUrl;

  constructor(private http: HttpClient) {}

  addSubItem(subItem: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/admin/item/add/sub_item`, subItem);
  }
}
