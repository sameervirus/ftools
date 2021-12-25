import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>('users', { observe: 'response' });
  }

  addUser(
    id: number,
    name: string,
    email: string,
    username: string,
    password: string,
    password_confirmation: string,
    role: number,
    type?: string
  ): Observable<any> {
    if (id === 0) {
      return this.http.post<any>(
        'users',
        {
          name,
          email,
          username,
          password,
          password_confirmation,
          role,
        },
        { observe: 'response' }
      );
    } else {
      return this.http.put<any>(
        'users/' + id,
        {
          name,
          email,
          username,
          password,
          password_confirmation,
          role,
          type,
        },
        { observe: 'response' }
      );
    }
  }

  getPermissions(): Observable<any> {
    return this.http.get<any>('users/permissions', { observe: 'response' });
  }

  getRoles(): Observable<any> {
    return this.http.get<any>('roles', { observe: 'response' });
  }

  addRole(
    id: number,
    name: string,
    name_ar: string,
    permission: any
  ): Observable<any> {
    if (id === 0) {
      return this.http.post<any>(
        'roles',
        { name, name_ar, permission },
        { observe: 'response' }
      );
    } else {
      return this.http.put<any>(
        'roles/' + id,
        { name, name_ar, permission },
        { observe: 'response' }
      );
    }
  }
}
