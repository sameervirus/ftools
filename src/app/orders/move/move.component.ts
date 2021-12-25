import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NotificationService, OrdersService } from 'src/app/_services';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.css'],
})
export class MoveComponent implements OnInit {
  today: any = Date.now();
  color = '';
  items: any;
  clients: any;
  client: number = 0;
  warehouse: number = 0;
  from_warehouse: any;
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
  invoiceDate = '';
  trans_no = '';
  trans_date = '';
  comments = '';
  type: any;
  title: any;
  isUpdate = false;

  constructor(
    private ordersService: OrdersService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const type = this.activatedRoute.snapshot.paramMap.get('type');
    const trans = this.activatedRoute.snapshot.paramMap.get('trans');
    if (trans && trans !== '0') this.getMoveDetails(trans);
    if (type) this.type = type;
    if (this.type == 1) this.from_warehouse = 1;
    this.getOrders();
    this.switchTitle(type);
  }
  getMoveDetails(trans: string) {
    this.ordersService.getMoveDetails(trans).subscribe((res) => {
      this.updateSelected(res.body.item);
    });
  }
  updateSelected(item: any) {
    this.client = item.client_id;
    this.warehouse = item.to;
    this.from_warehouse = item.from;
    this.invoiceNo = item.invo_no;
    this.invoiceDate = item.invo_date;
    this.trans_no = item.trans_no;
    this.trans_date = item.trans_date;
    this.totalQty = item.qty;
    this.totalPrice = item.cost;
    this.comments = item.comments;
    let itemData;
    item.details.forEach((element: any) => {
      itemData = element.item;
      itemData.qty = element.qty;
      itemData.cost = element.cost;
      this.selectedItems.push(itemData);
    });
    this.isUpdate = true;
  }
  switchTitle(type: string | null) {
    if (type) {
      switch (type) {
        case '1':
          this.title = 'فاتورة مشتريات';
          break;
        case '5':
          this.title = 'حركة مخازن';
          break;

        default:
          this.title = 'حركات';
          break;
      }
    }
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

  onWarehouseChange(e: any, direction: any) {
    if (e && e.id != 0) {
      if (direction == 'to') this.warehouse = e.id;
      if (direction == 'from') this.from_warehouse = e.id;
    } else {
      if (direction == 'to') this.warehouse = 0;
      if (direction == 'from') this.from_warehouse = 0;
    }
  }

  addItem(qty: any) {
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
    if (this.type == 1) document.getElementById('priceInput')!.focus();
    else document.getElementById('qtyInput')!.focus();
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
    if (this.type == 1 && this.client == 0) {
      alert('من فضلك اختار العميل');
      return false;
    }
    if (this.from_warehouse == 0) {
      alert('من فضلك اختار من مخزن');
      return false;
    }
    if (this.warehouse == 0) {
      alert('من فضلك اختار المخزن');
      return false;
    }
    if (this.type == 1 && this.invoiceNo == '') {
      alert('من فضلك ادخل رقم الفاتورة او اكتب بدون');
      return false;
    }
    if (this.type == 1 && this.invoiceDate == '') {
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
      .addMove(
        this.client,
        this.warehouse,
        this.from_warehouse,
        this.invoiceNo,
        this.invoiceDate,
        this.trans_no,
        this.trans_date,
        this.totalQty,
        this.totalPrice,
        this.comments,
        this.selectedItems,
        this.type,
        this.isUpdate
      )
      .subscribe({
        next: (res) => {
          this.showNotify('تم إضافة بنجاح', 'success');
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
