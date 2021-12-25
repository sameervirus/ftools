import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { UsersModule } from './users/users.module';
import { CodingModule } from './coding/coding.module';
import { OrdersModule } from './orders/orders.module';

// Services
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

//plugin
import { NgxPaginationModule } from 'ngx-pagination';
import { ExcelService } from './_services/';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { AppComponent } from './app.component';
import { NotificationComponent } from './components/notification/notification.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { FooterComponent } from './footer/footer/footer.component';
import { LayoutComponent } from './navbar/layout/layout.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent,
    HomeComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule,
    CodingModule,
    OrdersModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxPermissionsModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ExcelService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
