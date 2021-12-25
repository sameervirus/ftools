import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CodingService {
  constructor(private http: HttpClient) {}

  getProductCategory(): Observable<any> {
    return this.http.get<any>('categories', { observe: 'response' });
  }

  addCategory(id: number, name: string): Observable<any> {
    if (id === 0) {
      return this.http.post<any>(
        'categories',
        { name },
        { observe: 'response' }
      );
    } else {
      return this.http.put<any>(
        'categories/' + id,
        { name },
        { observe: 'response' }
      );
    }
  }

  getProductWarehouse(): Observable<any> {
    return this.http.get<any>('warehouses', { observe: 'response' });
  }

  addWarehouse(id: number, name: string): Observable<any> {
    if (id === 0) {
      return this.http.post<any>(
        'warehouses',
        { name },
        { observe: 'response' }
      );
    } else {
      return this.http.put<any>(
        'warehouses/' + id,
        { name },
        { observe: 'response' }
      );
    }
  }

  getProductUnit(): Observable<any> {
    return this.http.get<any>('units', { observe: 'response' });
  }

  addUnit(id: number, name: string): Observable<any> {
    if (id === 0) {
      return this.http.post<any>('units', { name }, { observe: 'response' });
    } else {
      return this.http.put<any>(
        'units/' + id,
        { name },
        { observe: 'response' }
      );
    }
  }

  getProducts(): Observable<any> {
    return this.http.get<any>('products', { observe: 'response' });
  }

  addPacking(
    id: number,
    name: string,
    name_ar: string,
    code: string,
    h: string,
    w: string,
    d: string,
    volume: string,
    weight: string,
    max_stock: string
  ): Observable<any> {
    if (id === 0) {
      return this.http.post<any>(
        'packings',
        {
          name: name,
          name_ar: name_ar,
          code: code,
          h: h,
          w: w,
          d: d,
          volume: volume,
          weight: weight,
          max_stock: max_stock,
        },
        { observe: 'response' }
      );
    } else {
      return this.http.put<any>(
        'packings/' + id,
        {
          name: name,
          name_ar: name_ar,
          code: code,
          h: h,
          w: w,
          d: d,
          volume: volume,
          weight: weight,
          max_stock: max_stock,
        },
        { observe: 'response' }
      );
    }
  }

  getPacking(): Observable<any> {
    return this.http.get<any>('packings', { observe: 'response' });
  }

  addProduct(
    id: number,
    pool_code: string,
    code: string,
    categories: any,
    name: string,
    name_ar: string,
    price: string,
    vat: number,
    client_code: null,
    packing_qty: string,
    net_weight: string,
    packing_dim: string,
    pieces: string,
    packing_id: number
  ) {
    if (id === 0) {
      return this.http.post<any>(
        'products',
        {
          pool_code: pool_code,
          code: code,
          categories: categories,
          name: name,
          name_ar: name_ar,
          price: price,
          vat: vat,
          client_code: client_code,
          packing_qty: packing_qty,
          net_weight: net_weight,
          packing_dim: packing_dim,
          pieces: pieces,
          packing_id: packing_id,
        },
        { observe: 'response' }
      );
    } else {
      return this.http.put<any>(
        'products/' + id,
        {
          pool_code: pool_code,
          code: code,
          categories: categories,
          name: name,
          name_ar: name_ar,
          price: price,
          vat: vat,
          client_code: client_code,
          packing_qty: packing_qty,
          net_weight: net_weight,
          packing_dim: packing_dim,
          pieces: pieces,
          packing_id: packing_id,
        },
        { observe: 'response' }
      );
    }
  }

  getDistribution(): Observable<any> {
    return this.http.get<any>('distributions', { observe: 'response' });
  }

  addDistribution(
    id: number,
    name: string,
    name_ar: string,
    code: string,
    district: number
  ): Observable<any> {
    if (id === 0) {
      return this.http.post<any>(
        'distributions',
        {
          name: name,
          name_ar: name_ar,
          code: code,
          district_id: district,
        },
        { observe: 'response' }
      );
    } else {
      return this.http.put<any>(
        'distributions/' + id,
        {
          name: name,
          name_ar: name_ar,
          code: code,
          district_id: district,
        },
        { observe: 'response' }
      );
    }
  }

  getCities(): Observable<any> {
    return this.http.get<any>('cities', { observe: 'response' });
  }

  addCity(id: number, name: string, name_ar: string): Observable<any> {
    if (id === 0) {
      return this.http.post<any>(
        'cities',
        { name: name, name_ar: name_ar },
        { observe: 'response' }
      );
    } else {
      return this.http.put<any>(
        'cities/' + id,
        { name: name, name_ar: name_ar },
        { observe: 'response' }
      );
    }
  }

  getReasons(): Observable<any> {
    return this.http.get<any>('reasons', { observe: 'response' });
  }

  addReason(id: number, name: string, name_ar: string): Observable<any> {
    if (id === 0) {
      return this.http.post<any>(
        'reasons',
        { name: name, name_ar: name_ar },
        { observe: 'response' }
      );
    } else {
      return this.http.put<any>(
        'reasons/' + id,
        { name: name, name_ar: name_ar },
        { observe: 'response' }
      );
    }
  }

  getDistrict(): Observable<any> {
    return this.http.get<any>('districts', { observe: 'response' });
  }

  addDistrict(
    id: number,
    name: string,
    name_ar: string,
    city_id: number,
    code: string
  ): Observable<any> {
    if (id === 0) {
      return this.http.post<any>(
        'districts',
        { name: name, name_ar: name_ar, city_id: city_id, code: code },
        { observe: 'response' }
      );
    } else {
      return this.http.put<any>(
        'districts/' + id,
        { name: name, name_ar: name_ar, city_id: city_id, code: code },
        { observe: 'response' }
      );
    }
  }

  getCars(): Observable<any> {
    return this.http.get<any>('cars', { observe: 'response' });
  }

  addCar(
    id: number,
    code: string,
    name: string,
    distribution_id: number
  ): Observable<any> {
    if (id === 0) {
      return this.http.post<any>(
        'cars',
        { code, name, distribution_id },
        { observe: 'response' }
      );
    } else {
      return this.http.put<any>(
        'cars/' + id,
        { code, name, distribution_id },
        { observe: 'response' }
      );
    }
  }

  // Clients Coding
  getClients(): Observable<any> {
    return this.http.get<any>('clients', { observe: 'response' });
  }

  addClient(id: number, name: string): Observable<any> {
    if (id === 0) {
      return this.http.post<any>(
        'clients',
        {
          name: name,
        },
        { observe: 'response' }
      );
    } else {
      return this.http.put<any>(
        'clients/' + id,
        {
          name: name,
        },
        { observe: 'response' }
      );
    }
  }

  // Clients Coding
  getBranches(): Observable<any> {
    return this.http.get<any>('branches', { observe: 'response' });
  }

  addBranch(
    id: number,
    name: string,
    name_ar: string,
    due_period: string,
    close_time: string,
    client_id: number,
    city_id: number,
    district_id: number,
    distribution_id: number,
    code: string,
    vat: boolean,
    opening: string,
    closing: string,
    address: string,
    phone: string,
    password: string
  ): Observable<any> {
    if (id === 0) {
      return this.http.post<any>(
        'branches',
        {
          name: name,
          name_ar: name_ar,
          due_period: due_period,
          close_time: close_time,
          client_id: client_id,
          city_id: city_id,
          district_id: district_id,
          distribution_id: distribution_id,
          code: code,
          vat: vat,
          opening: opening,
          closing: closing,
          address: address,
          phone: phone,
          password: password,
        },
        { observe: 'response' }
      );
    } else {
      return this.http.put<any>(
        'branches/' + id,
        {
          name: name,
          name_ar: name_ar,
          due_period: due_period,
          close_time: close_time,
          client_id: client_id,
          city_id: city_id,
          district_id: district_id,
          distribution_id: distribution_id,
          code: code,
          vat: vat,
          opening: opening,
          closing: closing,
          address: address,
          phone: phone,
          password: password,
        },
        { observe: 'response' }
      );
    }
  }

  getForeignData(): Observable<any> {
    return this.http.get<any>('helpers/foreign', { observe: 'response' });
  }

  getProductions(): Observable<any> {
    return this.http.get<any>('production-lines', { observe: 'response' });
  }

  addProduction(id: number, name: string, name_ar: string): Observable<any> {
    if (id === 0) {
      return this.http.post<any>(
        'production-lines',
        { name, name_ar },
        { observe: 'response' }
      );
    } else {
      return this.http.put<any>(
        'production-lines/' + id,
        { name, name_ar },
        { observe: 'response' }
      );
    }
  }

  getStatus(): Observable<any> {
    return this.http.get('helpers/status', { observe: 'response' });
  }
}
