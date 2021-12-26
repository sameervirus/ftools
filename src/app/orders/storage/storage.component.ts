import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NotificationService,
  OrdersService,
  ExcelService,
} from 'src/app/_services';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
})
export class StorageComponent implements OnInit {
  p = 0;
  warehouse: number = 0;
  warehouses: any;
  filteredItems: any;
  storage: any;
  categories: any;
  category: number = 0;
  searchStr: any;
  oWarehouses: any;

  constructor(
    private ordersService: OrdersService,
    private notificationService: NotificationService,
    private excelService: ExcelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStorage();
  }

  getStorage() {
    this.ordersService.getStorage().subscribe((res) => {
      this.storage = res.body.storage;
      this.filteredItems = res.body.storage;
      this.categories = res.body.categories;
      this.warehouses = res.body.warehouses;
      this.oWarehouses = res.body.warehouses;
    });
  }

  getQty(id: number, items: any) {
    const item = items.filter((i: any) => {
      return i.id === id;
    });

    return item[0] ? item[0].pivot.qty : null;
  }

  totalQty(items: any) {
    return items.reduce((a: any, i: any) => a + Number(i.pivot.qty), 0);
  }

  onCategoryChange(e: any) {
    if (e && e.id != 0) {
      this.category = e.id;
    } else {
      this.category = 0;
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

  onSearchChange(e: any) {
    this.searchStr = e.target.value;
    this.filterItems();
  }

  filterItems() {
    this.filteredItems = this.storage;
    this.warehouses = this.oWarehouses;
    this.p = 1;
    if (this.category != 0) {
      this.filteredItems = this.filteredItems.filter((i: any) => {
        return i.category_id === this.category;
      });
    }

    if (this.warehouse != 0) {
      this.warehouses = this.oWarehouses.filter((w: any) => {
        return w.id === this.warehouse;
      });
      const item = this.filteredItems.map((f: any) => {
        let has = f.warehouses.filter((i: any) => {
          return i.id === this.warehouse;
        });
        if (has.length > 0) return f;
        else return null;
      });

      this.filteredItems = item.filter((i: any) => i !== null);
    }

    if (this.searchStr != '' && this.searchStr != undefined) {
      this.filteredItems = this.filteredItems.filter(
        (a: any) =>
          a.name.toLowerCase().includes(this.searchStr.toLowerCase()) ||
          (a.code + '').toLowerCase().includes(this.searchStr.toLowerCase())
      );
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
      let single: any = {};
      single.الكود = item.code;
      single.الاسم = item.name;
      single.الوحدة = item.unit;
      single.التصنيف = item.category;
      single.الاجمالي = this.totalQty(item.warehouses);
      this.warehouses.forEach((i: any) => {
        let wname = i.name;
        single[wname] = this.getQty(i.id, item.warehouses);
      });
      data.push(single);
    });

    this.excelService.exportAsExcelFile(data, 'Movement ' + new Date());
  }
}
