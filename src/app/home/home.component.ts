import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  users = false;
  user: any;

  constructor() {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser')!).user;

    if (
      this.user.permissions.includes('manage users') ||
      this.user.permissions.includes('manage all users')
    ) {
      this.users = true;
    }
  }
}
