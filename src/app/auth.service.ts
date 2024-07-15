// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: boolean = false;
  private username: string = '';

  constructor() { }

  login(username: string, password: string): boolean {
    // Kullanıcı adı ve şifre kontrolü burada yapılabilir
    if (username === 'admin' && password === '123') {
      this.loggedIn = true;
      this.username = username;
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    this.username = '';
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUsername(): string {
    return this.username;
  }
}
