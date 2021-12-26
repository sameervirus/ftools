import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/_services';

@Component({
  selector: 'app-moveitem',
  templateUrl: './moveitem.component.html',
  styleUrls: ['./moveitem.component.css'],
})
export class MoveitemComponent implements OnInit {
  currentIndex = 0;
  currentItem: any;
  filteredItems: any;
  isOpen = false;
  items: any;
  itemInput: any;
  moves: any;
  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getOrders();
    if (this.currentItem) document.getElementById('inputItem')!.focus();
  }

  getOrders() {
    this.ordersService.getOrders().subscribe((res) => {
      this.items = res.body.items;
    });
  }

  selectedItem(currentItem: any) {
    this.isOpen = false;
    this.currentIndex = 0;
    this.itemInput = currentItem.code + ' : ' + currentItem.name;
    this.getCurrent(currentItem.code);
  }

  getCurrent(currentItem: any) {
    this.ordersService.getCurrent(currentItem).subscribe((res) => {
      this.currentItem = res.body.item;
      this.moves = res.body.moves;
    });
  }

  totalQty(items: any) {
    return items.reduce((a: any, i: any) => a + Number(i.pivot.qty), 0);
  }

  clickedItem(currentItem: any) {
    this.selectedItem(currentItem);
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
}
