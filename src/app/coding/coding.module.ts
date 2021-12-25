import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CodingRoutingModule } from './coding-routing.module';

// Plugin
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPermissionsModule } from 'ngx-permissions';

import { CodingComponent } from './coding/coding.component';
import { CategoryComponent } from './category/category.component';
import { UnitComponent } from './units/unit.component';
import { ClientsComponent } from './clients/clients.component';
import { WarehouseComponent } from './warehouses/warehouse.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    CodingComponent,
    CategoryComponent,
    UnitComponent,
    ClientsComponent,
    WarehouseComponent,
    ItemComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    CodingRoutingModule,
    NgxPaginationModule,
    NgSelectModule,
    NgxPermissionsModule.forChild(),
  ],
  exports: [CodingComponent],
})
export class CodingModule {}
