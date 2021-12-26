import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders-routing.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPermissionsModule } from 'ngx-permissions';

import { MovelistComponent } from './movelist/movelist.component';
import { ItemComponent } from './item/item.component';
import { MoveComponent } from './move/move.component';
import { StorageComponent } from './storage/storage.component';
import { MoveitemComponent } from './moveitem/moveitem.component';

@NgModule({
  declarations: [MovelistComponent, ItemComponent, MoveComponent, StorageComponent, MoveitemComponent],
  imports: [
    FormsModule,
    CommonModule,
    OrdersRoutingModule,
    NgxPaginationModule,
    NgSelectModule,
    NgxPermissionsModule.forChild(),
  ],
  exports: [MoveComponent],
})
export class OrdersModule {}
