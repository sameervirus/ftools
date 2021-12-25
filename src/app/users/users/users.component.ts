import { Component, OnInit } from '@angular/core';

import { NotificationService, UsersService } from '../../_services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: any;
  usersOrigin: any;
  roles: any;
  rolesOrigin: any;
  p: number = 1;
  user = {
    id: 0,
    name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    role: 0,
  };
  loading = false;
  isUpdate = false;

  constructor(
    private usersService: UsersService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe((res) => {
      this.users = res.body.result.users;
      this.usersOrigin = res.body.result.users;
      this.roles = res.body.result.roles;
      this.rolesOrigin = res.body.result.roles;
    });
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
        this.user.role
      )
      .subscribe(
        (res) => {
          if (this.isUpdate) {
            this.users = res.body.result.users;
            this.showNotify('تم تحديث العنصر الخاص بك بنجاح', 'success');
            this.isUpdate = false;
            this.user.id = 0;
          } else {
            this.users.push(res.body);
            this.showNotify('تمت إضافة العنصر الخاص بك بنجاح', 'success');
          }
          userForm.reset();
          this.loading = false;
        },
        (err) => {
          let message = '';
          if (err.status == 422) {
            message = JSON.stringify(err.error.errors);
          } else {
            console.log(err);
            message = 'الخادم معطل ، يرجى المحاولة مرة أخرى';
          }
          this.showNotify(message, 'error');
          this.loading = false;
        }
      );
  }

  editUser(
    id: number,
    name: string,
    email: string,
    username: string,
    role: number
  ) {
    this.isUpdate = true;
    this.user.id = id;
    this.user.name = name;
    this.user.email = email;
    this.user.username = username;
    this.user.role = role;
  }

  resetFrom(userForm: any) {
    userForm.reset();
    this.isUpdate = false;
    this.user.id = 0;
  }

  showNotify(message: string, status: string) {
    this.notificationService.sendMessages(message, status, true, {
      text: 'Ok',
    });
  }
}
