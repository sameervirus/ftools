import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrdersService } from 'src/app/_services';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  item: any;
  p = 1;
  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    const trans = this.activatedRoute.snapshot.paramMap.get('trans');
    if (trans) this.getMoveDetails(trans);
  }

  getMoveDetails(trans: string) {
    this.ordersService.getMoveDetails(trans).subscribe((res) => {
      this.item = res.body.item;
    });
  }
}
