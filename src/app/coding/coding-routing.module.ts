import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../_helpers';
import { CategoryComponent } from './category/category.component';
import { ClientsComponent } from './clients/clients.component';

import { CodingComponent } from './coding/coding.component';
import { ItemComponent } from './item/item.component';
import { UnitComponent } from './units/unit.component';
import { WarehouseComponent } from './warehouses/warehouse.component';

const routes: Routes = [
  {
    path: '',
    component: CodingComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'التكويد',
    },
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'التصنيفات',
    },
  },
  {
    path: 'units',
    component: UnitComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'الوحدة',
    },
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'العملاء',
    },
  },
  {
    path: 'warehouses',
    component: WarehouseComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'المخازن',
    },
  },
  {
    path: 'items',
    component: ItemComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'الاصناف',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodingRoutingModule {}
