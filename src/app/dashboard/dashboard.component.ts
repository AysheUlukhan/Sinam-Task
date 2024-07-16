import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { StoreService } from '../store.service';
import { Store, Product } from '../store.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: string;
  stores: Store[] = [];
  products: { storeId: number, product: Product }[] = [];

  constructor(private authService: AuthService, private storeService: StoreService, private router: Router) {
    this.username = this.authService.getUsername();
  }

  ngOnInit(): void {
    this.storeService.getStores().subscribe(data => {
      this.stores = data.stores;
      this.products = this.stores.flatMap(store => store.products.map(product => ({ storeId: store.id, product })));
    });
  }

  editProduct(storeId: number, productId: number): void {
    this.router.navigate(['/edit-product', storeId, productId]);
  }

  deleteProduct(storeId: number, productId: number): void {
    this.storeService.deleteProduct(storeId, productId).subscribe(() => {
      this.products = this.products.filter(p => !(p.storeId === storeId && p.product.id === productId));
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getStoreName(storeId: number): string {
    const store = this.stores.find(s => s.id === storeId);
    return store ? store.storeName : 'Unknown Store';
  }
}
