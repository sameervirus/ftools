import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgxPermissionsService } from 'ngx-permissions';

import { CodingService } from '../../_services';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  sidebarStyle = environment.sidebarStyle ?? 'sidebar-dark-primary';
  permissionItems: boolean = false;

  homeMenu: boolean = false;
  codingMenu: boolean = false;
  movelistMenu: boolean = false;
  storageMenu: boolean = false;
  moveitemMenu: boolean = false;

  movesMenu: boolean = false;
  movesSub: boolean = false;
  purchaseComp: boolean = false;
  transferComp: boolean = false;
  exchangeComp: boolean = false;
  returnComp: boolean = false;
  salesComp: boolean = false;
  destructionComp: boolean = false;

  user: any;
  usersMenu: boolean = false;
  usersSub: boolean = false;
  usersComp: boolean = false;
  rolesComp: boolean = false;
  profileComp: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private permissionsService: NgxPermissionsService,
    private router: Router
  ) {
    router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.changeSide(event.url);
      });
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser')!).user;
      const perm = this.user.permissions;
      this.permissionsService.loadPermissions(perm);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.indexOf('login') === -1) {
          // this.getProductions();
        }
      }
    });
  }

  showThis() {
    return false;
  }

  changeView(item: string) {
    switch (item) {
      case 'home':
        this.tabsClose();
        if (this.homeMenu) {
          this.homeMenu = false;
        } else {
          this.homeMenu = true;
        }
        break;
      case 'moves':
        this.tabsClose();
        if (this.movesMenu) {
          this.movesMenu = false;
          this.movesSub = false;
        } else {
          this.movesMenu = true;
          this.movesSub = true;
        }
        break;
      case 'coding':
        this.tabsClose();
        if (this.codingMenu) {
          this.codingMenu = false;
        } else {
          this.codingMenu = true;
        }
        break;
      case 'movelist':
        this.tabsClose();
        if (this.movelistMenu) {
          this.movelistMenu = false;
        } else {
          this.movelistMenu = true;
        }
        break;
      case 'storage':
        this.tabsClose();
        if (this.storageMenu) {
          this.storageMenu = false;
        } else {
          this.storageMenu = true;
        }
        break;
      case 'moveitem':
        this.tabsClose();
        if (this.moveitemMenu) {
          this.moveitemMenu = false;
        } else {
          this.moveitemMenu = true;
        }
        break;

      case 'users':
        this.tabsClose();
        if (this.usersMenu) {
          this.usersMenu = false;
          this.usersSub = false;
        } else {
          this.usersMenu = true;
          this.usersSub = true;
        }
        break;
      case 'reports':
        this.tabsClose();

        break;

      default:
        // code...
        break;
    }
  }

  changeSide(url: string) {
    if (url.includes('')) {
      // this.homeMenu = true;
    } else if (url.includes('coding')) {
      this.codingMenu = true;
    } else if (url.includes('movelist')) {
      this.movelistMenu = true;
    } else if (url.includes('storage')) {
      this.storageMenu = true;
    } else if (url.includes('moveitem')) {
      this.moveitemMenu = true;
    } else if (url.includes('/orders/move/')) {
      this.tabsClose();
      this.movesMenu = true;
      this.movesSub = true;
      this.purchaseComp = url.includes('/orders/move/1') ? true : false;
      this.transferComp = url.includes('/orders/move/2') ? true : false;
      this.exchangeComp = url.includes('/orders/move/3') ? true : false;
      this.returnComp = url.includes('/orders/move/4') ? true : false;
      this.salesComp = url.includes('/orders/move/5') ? true : false;
      this.destructionComp = url.includes('/orders/move/6') ? true : false;
    } else if (url.includes('users')) {
      this.tabsClose();
      this.usersMenu = true;
      this.usersSub = true;
      this.usersComp = url.endsWith('users') ? true : false;
      this.rolesComp = url.includes('roles') ? true : false;
      this.profileComp = url.includes('profile') ? true : false;
    } else if (url.includes('reports')) {
      this.tabsClose();
    } else {
      this.tabsClose();
    }
  }

  tabsClose() {
    this.homeMenu = false;
    this.codingMenu = false;
    this.movelistMenu = false;
    this.storageMenu = false;
    this.moveitemMenu = false;
    this.usersMenu = false;
    this.usersSub = false;
    this.usersComp = false;
    this.rolesComp = false;
    this.profileComp = false;
    this.movesMenu = false;
    this.movesSub = false;
    this.purchaseComp = false;
    this.transferComp = false;
    this.exchangeComp = false;
    this.returnComp = false;
    this.salesComp = false;
    this.destructionComp = false;
  }
}
