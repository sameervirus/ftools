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
    this.usersMenu = false;
    this.usersSub = false;
    this.usersComp = false;
    this.rolesComp = false;
    this.profileComp = false;
  }
}
