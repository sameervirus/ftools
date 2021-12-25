import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  addMove(
    client: number,
    warehouse: number,
    from_warehouse: any,
    invoiceNo: string,
    invoiceDate: string,
    trans_no: string,
    trans_date: string,
    totalQty: number,
    totalPrice: number,
    comments: string,
    selectedItems: any,
    type: any,
    isUpdate: boolean
  ): Observable<any> {
    return this.http.post<any>(
      'orders/move',
      {
        client,
        from_warehouse,
        warehouse,
        invoiceNo,
        invoiceDate,
        trans_no,
        trans_date,
        totalQty,
        totalPrice,
        comments,
        selectedItems,
        type,
        isUpdate,
      },
      { observe: 'response' }
    );
  }
  addTransfer(
    from_warehouse: any,
    warehouse: number,
    trans_no: string,
    trans_date: string,
    totalQty: number,
    totalPrice: number,
    comments: string,
    selectedItems: any
  ): Observable<any> {
    return this.http.post<any>(
      'orders/transfer',
      {
        from_warehouse,
        warehouse,
        trans_no,
        trans_date,
        totalQty,
        totalPrice,
        comments,
        selectedItems,
      },
      { observe: 'response' }
    );
  }
  addInvoice(
    client: number,
    warehouse: number,
    invoiceNo: string,
    trans_no: string,
    trans_date: string,
    totalQty: number,
    totalPrice: number,
    comments: string,
    selectedItems: any
  ): Observable<any> {
    return this.http.post<any>(
      'orders/purchase',
      {
        client,
        warehouse,
        invoiceNo,
        trans_no,
        trans_date,
        totalQty,
        totalPrice,
        comments,
        selectedItems,
      },
      { observe: 'response' }
    );
  }
  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get<any>('orders', { observe: 'response' });
  }

  getMovements(): Observable<any> {
    return this.http.get<any>('movements', { observe: 'response' });
  }

  getMoveDetails(trans: string): Observable<any> {
    return this.http.get<any>('movements/' + trans, { observe: 'response' });
  }
}
