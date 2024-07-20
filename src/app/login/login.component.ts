import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string; 
  error: string;

  constructor(public authService: AuthService, private router: Router) { // authService public
    this.username = '';
    this.password = ''; 
    this.error = '';
  }

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      if (this.authService.isAdmin()) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/home']);
      }
    } else {
      this.error = 'Username or password is incorrect.';
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
