import { Component, OnInit } from '@angular/core';

import { ItemService, NotificationService } from '../../_services';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  items: any;
  OrignItems: any;
  categories: any;
  units: any;
  p: number = 1;
  item = { id: 0, name: '', code: 0, unit_id: 0, category_id: 0, iprice: 0 };
  loading = false;
  isUpdate = false;

  constructor(
    private itemService: ItemService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemService.getItems().subscribe((res) => {
      this.items = res.body.items;
      this.OrignItems = res.body.items;
      this.categories = res.body.categories;
      this.units = res.body.units;
    });
  }

  onSearchChange(e: any) {
    let str = e.target.value;
    this.items = this.OrignItems.filter((a: any) =>
      a.name.toLowerCase().includes(str.toLowerCase())
    );
  }

  onSubmit(itemForm: any) {
    this.loading = true;
    this.itemService
      .addItem(
        this.item.id,
        this.item.name,
        this.item.code,
        this.item.unit_id,
        this.item.category_id,
        this.item.iprice
      )
      .subscribe({
        next: (res) => {
          if (this.isUpdate) {
            this.items = res.body.items;
            this.showNotify('تم تحديث العنصر الخاص بك بنجاح', 'success');
            this.isUpdate = false;
            this.item.id = 0;
          } else {
            this.items.push(res.body);
            this.showNotify('تمت إضافة العنصر الخاص بك بنجاح', 'success');
          }
          itemForm.reset();
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

  editItem(
    id: number,
    name: string,
    code: number,
    unit_id: number,
    category_id: number,
    iprice: number
  ) {
    this.isUpdate = true;
    this.item.id = id;
    this.item.name = name;
    this.item.code = code;
    this.item.unit_id = unit_id;
    this.item.category_id = category_id;
    this.item.iprice = iprice;
  }

  resetFrom(itemForm: any) {
    itemForm.reset();
    this.isUpdate = false;
    this.item.id = 0;
  }

  showNotify(message: string, status: string) {
    this.notificationService.sendMessages(message, status, true, {
      text: 'Ok',
    });
  }
}
