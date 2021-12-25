import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    return this.http.get<any>('items', { observe: 'response' });
  }

  addItem(
    id: number,
    name: string,
    code: number,
    unit_id: number,
    category_id: number,
    iprice: number
  ): Observable<any> {
    if (id === 0) {
      return this.http.post<any>(
        'items',
        { name, code, unit_id, category_id, iprice },
        { observe: 'response' }
      );
    } else {
      return this.http.put<any>(
        'items/' + id,
        { name, code, unit_id, category_id, iprice },
        { observe: 'response' }
      );
    }
  }
}
