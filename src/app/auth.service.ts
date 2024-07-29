import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;
  private username: string = '';

  constructor() {
    this.loadUser();
  }

  private loadUser(): void {
    try {
      const storedUser = localStorage.getItem('loggedInUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.username = user.username;
        this.loggedIn = true;
      }
    } catch (e) {
      console.error('Error loading user from localStorage:', e);
      this.logout();
    }
  }

  register(username: string, password: string): boolean {
    const users = this.getUsers();
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      return false;
    }
    users.push({ username, password });
    this.setUsers(users);
    return true;
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '123') {
      this.loggedIn = true;
      this.username = username;
      localStorage.setItem('loggedInUser', JSON.stringify({ username }));
      return true;
    }

    const users = this.getUsers();
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      this.loggedIn = true;
      this.username = username;
      localStorage.setItem('loggedInUser', JSON.stringify({ username }));
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    this.username = '';
    localStorage.removeItem('loggedInUser');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUsername(): string {
    return this.username;
  }

  isAdmin(): boolean {
    return this.username === 'admin';
  }

  private getUsers(): { username: string, password: string }[] {
    const users = localStorage.getItem('users');
    try {
      return users ? JSON.parse(users) : [];
    } catch (e) {
      console.error('Error parsing users from localStorage:', e);
      return [];
    }
  }

  private setUsers(users: { username: string, password: string }[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }
}
