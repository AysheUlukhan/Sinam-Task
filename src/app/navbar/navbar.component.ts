import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showNavbar: boolean = true;

  constructor(public authService: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {
    this.checkRoute(this.router.url);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  checkRoute(url: string): void {
    const hiddenRoutes = [
      '/login', 
      '/register', 
      '/dashboard', 
      /^\/edit-product\/\d+\/\d+$/,
       /^\/add-product\/\d+$/
    ];
    this.showNavbar = !hiddenRoutes.some(route => 
      typeof route === 'string' ? url.includes(route) : route.test(url)
    );
  }
}
