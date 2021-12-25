import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService, OrdersService } from 'src/app/_services';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent implements OnInit {
  today: any = Date.now();
  color = '';
  items: any;
  clients: any;
  client: number = 0;
  warehouse: number = 0;
  warehouses: any;
  isOpen = false;
  filteredItems: any;
  currentIndex = 0;
  currentItem: any;
  selectedItems: any = [];
  itemInput: any;
  itemPrice: any;
  totalQty = 0;
  totalPrice = 0;
  invoiceNo = '';
  invoDate = '';
  trans_no = '';
  trans_date = '';
  comments = '';
  constructor(
    private ordersService: OrdersService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrders().subscribe((res) => {
      this.items = res.body.items;
      this.clients = res.body.clients;
      this.warehouses = res.body.warehouses;
    });
  }

  onClientChange(e: any) {
    if (e && e.id != 0) {
      this.client = e.id;
    } else {
      this.client = 0;
    }
  }

  onWarehouseChange(e: any) {
    if (e && e.id != 0) {
      this.warehouse = e.id;
    } else {
      this.warehouse = 0;
    }
  }

  addItem(qty: any) {
    console.log(qty.value);
    if (qty) {
      this.currentItem.qty = this.currentItem.qty
        ? Number(this.currentItem.qty) + Number(qty.value)
        : qty.value;
      this.pushItem(this.currentItem);
      this.currentItem = null;
      this.itemInput = null;
      this.itemPrice = null;
      qty.value = null;
      this.calculateTotals();
      document.getElementById('inputItem')!.focus();
    } else {
      alert('من فضلك اختار الكمية');
    }
  }
  calculateTotals() {
    this.totalQty = this.selectedItems.reduce(
      (a: any, i: any) => a + Number(i.qty),
      0
    );
    this.totalPrice = this.selectedItems.reduce(
      (a: any, i: any) => a + Number(i.qty) * Number(i.price),
      0
    );
  }

  pushItem(currentItem: any) {
    const existingItem = this.selectedItems.find((item: any) => {
      return item.id === currentItem.id;
    });
    if (!existingItem) {
      this.selectedItems.push(currentItem);
    }
  }

  selectedItem(currentItem: any) {
    this.isOpen = false;
    this.currentIndex = 0;
    this.itemInput = currentItem.code + ' : ' + currentItem.name;
    this.currentItem = currentItem;
    document.getElementById('priceInput')!.focus();
  }

  addPrice(e: any) {
    this.currentItem.price = this.itemPrice
      ? this.itemPrice
      : this.currentItem.price;
    document.getElementById('qtyInput')!.focus();
  }

  clickedItem(currentItem: any) {
    this.currentItem = currentItem;
    this.selectedItem(currentItem);
  }

  saveInvoice() {
    if (this.client == 0) {
      alert('من فضلك اختار العميل');
      return false;
    }
    if (this.warehouse == 0) {
      alert('من فضلك اختار المخزن');
      return false;
    }
    if (this.invoiceNo == '') {
      alert('من فضلك ادخل رقم الفاتورة او اكتب بدون');
      return false;
    }
    if (this.trans_no == '') {
      alert('من فضلك ادخل رقم الاذن');
      return false;
    }
    if (this.trans_date == '') {
      alert('من فضلك ادخل تاريخ الاذن');
      return false;
    }

    this.ordersService
      .addInvoice(
        this.client,
        this.warehouse,
        this.invoiceNo,
        this.trans_no,
        this.trans_date,
        this.totalQty,
        this.totalPrice,
        this.comments,
        this.selectedItems
      )
      .subscribe({
        next: (res) => {
          this.showNotify('تم إضافة الفاتورة بنجاح', 'success');
          this.router.navigate(['/']);
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
        complete: () => {},
      });

    return true;
  }

  handleDown(e: any) {
    if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
      e.preventDefault();
    }
  }

  handleInput(e: any) {
    switch (e.key) {
      case 'ArrowUp':
        this._handleArrowUp(e);
        break;
      case 'ArrowDown':
        this._handleArrowDown(e);
        break;
      case 'Enter':
        this._handleEnter(e);
        break;

      default:
        this._handleInput(e);
        break;
    }
  }

  handleBlur(e: any) {
    this.isOpen = false;
    this.currentIndex = 0;
  }

  _handleInput(e: any) {
    let str = e.target.value;
    if (e && str != '') {
      this.filteredItems = this.items.filter(
        (a: any) =>
          a.name.toLowerCase().includes(str.toLowerCase()) ||
          (a.code + '').toLowerCase().includes(str.toLowerCase())
      );
      this.currentIndex = 0;
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }
  _handleEnter($event: any) {
    if (this.isOpen) {
      this.selectedItem(this.filteredItems[this.currentIndex]);
    }
  }

  _handleArrowDown($event: any) {
    if (this.isOpen) {
      if (this.currentIndex < this.filteredItems.length - 1)
        this.currentIndex++;
    }
  }
  _handleArrowUp($event: any) {
    if (this.isOpen) {
      if (this.currentIndex > 0) this.currentIndex--;
    }
  }

  showNotify(message: string, status: string) {
    this.notificationService.sendMessages(message, status, true, {
      text: 'Ok',
    });
  }
}
