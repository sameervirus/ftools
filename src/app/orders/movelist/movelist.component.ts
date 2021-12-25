import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NotificationService,
  OrdersService,
  ExcelService,
} from 'src/app/_services';

@Component({
  selector: 'app-movelist',
  templateUrl: './movelist.component.html',
  styleUrls: ['./movelist.component.css'],
})
export class MovelistComponent implements OnInit {
  p = 0;
  clients: any;
  client: number = 0;
  warehouse: number = 0;
  warehouses: any;
  filteredItems: any;
  from_trans_date = '';
  to_trans_date = '';
  transfers: any;
  transfer_type: number = 0;
  moves: any;

  constructor(
    private ordersService: OrdersService,
    private notificationService: NotificationService,
    private excelService: ExcelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovements();
  }

  getMovements() {
    this.ordersService.getMovements().subscribe((res) => {
      this.moves = res.body.moves;
      this.filteredItems = res.body.moves;
      this.clients = res.body.clients;
      this.transfers = res.body.transfers;
      this.warehouses = res.body.warehouses;
    });
  }

  onClientChange(e: any) {
    if (e && e.id != 0) {
      this.client = e.id;
    } else {
      this.client = 0;
    }
    this.filterItems();
  }

  onWarehouseChange(e: any) {
    if (e && e.id != 0) {
      this.warehouse = e.id;
    } else {
      this.warehouse = 0;
    }
    this.filterItems();
  }

  onTransferChange(e: any) {
    if (e && e.id != 0) {
      this.transfer_type = e.id;
    } else {
      this.transfer_type = 0;
    }
    this.filterItems();
  }

  filterItems() {
    console.log(this.client);
    console.log(this.warehouse);
    console.log(this.transfer_type);
    console.log(this.from_trans_date);
    console.log(this.to_trans_date);
    this.filteredItems = this.moves;
    if (this.client != 0) {
      this.filteredItems = this.filteredItems.filter((i: any) => {
        return i.client_id === this.client;
      });
    }

    if (this.warehouse != 0) {
      this.filteredItems = this.filteredItems.filter((i: any) => {
        return i.from === this.warehouse || i.to === this.warehouse;
      });
    }

    if (this.transfer_type != 0) {
      this.filteredItems = this.filteredItems.filter((i: any) => {
        return i.transfer_type_id === this.transfer_type;
      });
    }

    if (this.from_trans_date != '') {
      let fromDate = new Date(this.from_trans_date);
      this.filteredItems = this.filteredItems.filter((i: any) => {
        return new Date(i.trans_date) >= fromDate;
      });
    }

    if (this.to_trans_date != '') {
      let toDate = new Date(this.to_trans_date);
      this.filteredItems = this.filteredItems.filter((i: any) => {
        return new Date(i.trans_date) <= toDate;
      });
    }
  }

  showNotify(message: string, status: string) {
    this.notificationService.sendMessages(message, status, true, {
      text: 'Ok',
    });
  }

  exportAsXLSX(): void {
    let data: any = [];
    this.filteredItems.forEach((item: any) => {
      data.push({
        التاريخ: item.trans_date,
        'رقم الاذن': item.trans_no,
        من: item.from_warehouse,
        الي: item.to_warehouse,
        'نوع الحركة': item.transfer_type_name,
        الكمية: item.qty,
        التكلفة: item.cost,
        العميل: item.client,
        ملاحظات: item.comments,
      });
    });

    this.excelService.exportAsExcelFile(data, 'Movement ' + new Date());
  }
}
