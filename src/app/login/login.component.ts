// login.component.ts

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
  password: string; // Burada password tipini string olaraq təyin edin
  error: string;

  constructor(private authService: AuthService, private router: Router) {
    this.username = '';
    this.password = ''; // Default olaraq boş string təyin edin
    this.error = '';
  }

  login(): void {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Username or password is incorrect.';
    }
  }
}
