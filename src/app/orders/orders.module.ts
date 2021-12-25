import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPermissionsModule } from 'ngx-permissions';

import { PurchaseComponent } from './purchase/purchase.component';
import { TransferComponent } from './transfer/transfer.component';
import { MovelistComponent } from './movelist/movelist.component';
import { ItemComponent } from './item/item.component';
import { MoveComponent } from './move/move.component';

@NgModule({
  declarations: [PurchaseComponent, TransferComponent, MovelistComponent, ItemComponent, MoveComponent],
  imports: [
    FormsModule,
    CommonModule,
    OrdersRoutingModule,
    NgxPaginationModule,
    NgSelectModule,
    NgxPermissionsModule.forChild(),
  ],
  exports: [PurchaseComponent],
})
export class OrdersModule {}
