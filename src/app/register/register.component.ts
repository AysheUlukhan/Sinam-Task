import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';
  success: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.error = 'Parollar uyğun gəlmir.';
      return;
    }

    if (this.authService.register(this.username, this.password)) {
      this.success = 'Qeydiyyat uğurlu oldu! İndi daxil ola bilərsiniz.';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    } else {
      this.error = 'İstifadəçi adı artıq mövcuddur.';
    }
  }
}
