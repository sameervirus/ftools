import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_helpers';
import { ItemComponent } from './item/item.component';
import { MoveComponent } from './move/move.component';
import { MoveitemComponent } from './moveitem/moveitem.component';
import { MovelistComponent } from './movelist/movelist.component';
import { StorageComponent } from './storage/storage.component';

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
  {
    path: 'storage',
    component: StorageComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'المخازن',
    },
  },
  {
    path: 'moveitem',
    component: MoveitemComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'كارت صنف',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
