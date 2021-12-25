import { Component, OnInit } from '@angular/core';

import { NotificationService, UsersService } from '../../_services';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loading: boolean = false;
  branches: any;
  type: string = 'single';
  userData: any;

  user = {
    id: 0,
    name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    role: 0,
  };

  constructor(
    private usersService: UsersService,
    private notificationService: NotificationService,
    private permissionsService: NgxPermissionsService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.userData = JSON.parse(localStorage.getItem('currentUser')!);
      this.user = this.userData.user;
      const perm = this.userData.user.permissions;
      this.permissionsService.loadPermissions(perm);
    }
  }

  onSubmit(userForm: any) {
    this.loading = true;
    this.usersService
      .addUser(
        this.user.id,
        this.user.name,
        this.user.email,
        this.user.username,
        this.user.password,
        this.user.password_confirmation,
        this.user.role,
        this.type
      )
      .subscribe({
        next: (res) => {
          this.user = res.body.data;
          this.userData.user = res.body.data;
          localStorage.setItem('currentUser', JSON.stringify(this.userData));
          this.showNotify('تم تحديث العنصر الخاص بك بنجاح', 'success');
        },
        error: (err) => {
          let message = '';
          if (err.status == 400) {
            message = JSON.stringify(err.error.message);
            this.showNotify(message, 'error');
          }
          if (err.status == 422) {
            message = JSON.stringify(err.error.errors);
            this.showNotify(message, 'error');
          }
        },
        complete: () => (this.loading = false),
      });
  }

  showNotify(message: string, status: string) {
    this.notificationService.sendMessages(message, status, true, {
      text: 'Ok',
    });
  }
}
