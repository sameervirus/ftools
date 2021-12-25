import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_helpers';
import { ItemComponent } from './item/item.component';
import { MoveComponent } from './move/move.component';
import { MovelistComponent } from './movelist/movelist.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { TransferComponent } from './transfer/transfer.component';

const routes: Routes = [
  {
    path: 'move/:type/:trans',
    component: MoveComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'عمل حركة',
    },
  },
  {
    path: 'purchase',
    component: PurchaseComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'فاتورة مشتريات',
    },
  },
  {
    path: 'transfer',
    component: TransferComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'تحويل',
    },
  },
  {
    path: 'movelist',
    component: MovelistComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'الحركات',
    },
  },
  {
    path: 'item/:trans',
    component: ItemComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'حركة',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
