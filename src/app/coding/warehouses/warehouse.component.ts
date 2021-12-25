import { Component, OnInit } from '@angular/core';

import { CodingService, NotificationService } from '../../_services';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css'],
})
export class WarehouseComponent implements OnInit {
  warehouses: any;
  OrignWarehouses: any;
  p: number = 1;
  warehouse = { id: 0, name: '' };
  loading = false;
  isUpdate = false;

  constructor(
    private codingService: CodingService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getWarehouses();
  }

  getWarehouses() {
    this.codingService.getProductWarehouse().subscribe((res) => {
      this.warehouses = res.body;
      this.OrignWarehouses = res.body;
    });
  }

  onSearchChange(e: any) {
    let str = e.target.value;
    this.warehouses = this.OrignWarehouses.filter((a: any) =>
      a.name.toLowerCase().includes(str.toLowerCase())
    );
  }

  onSubmit(warehouseForm: any) {
    this.loading = true;
    this.codingService
      .addWarehouse(this.warehouse.id, this.warehouse.name)
      .subscribe({
        next: (res) => {
          if (this.isUpdate) {
            this.warehouses = res.body;
            this.showNotify('تم تحديث العنصر الخاص بك بنجاح', 'success');
            this.isUpdate = false;
            this.warehouse.id = 0;
          } else {
            this.warehouses.push(res.body);
            this.showNotify('تمت إضافة العنصر الخاص بك بنجاح', 'success');
          }
          warehouseForm.reset();
        },
        error: (err) => {
          let message = '';
          if (err.status == 422) {
            message = JSON.stringify(err.error.errors);
          } else {
            console.log(err);
            message = 'الخادم معطل ، يرجى المحاولة مرة أخرى';
          }
          this.showNotify(message, 'error');
        },
        complete: () => (this.loading = false),
      });
  }

  editWarehouse(id: number, name: string) {
    this.isUpdate = true;
    this.warehouse.id = id;
    this.warehouse.name = name;
  }

  resetFrom(warehouseForm: any) {
    warehouseForm.reset();
    this.isUpdate = false;
    this.warehouse.id = 0;
  }

  showNotify(message: string, status: string) {
    this.notificationService.sendMessages(message, status, true, {
      text: 'Ok',
    });
  }
}
