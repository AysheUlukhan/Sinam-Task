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
  selectedStoreId: number | null = null;

  constructor(private authService: AuthService, private storeService: StoreService, private router: Router) {
    this.username = this.authService.getUsername();
  }

  ngOnInit(): void {
    this.storeService.getStores().subscribe(data => {
      this.stores = data.stores;
      this.loadProductsFromLocalStorage();
    });
  }

  loadProductsFromLocalStorage(): void {
    const localProducts = JSON.parse(localStorage.getItem('products') || '[]');
    this.products = localProducts.map((product: Product) => ({ storeId: product.storeId, product }));
    if (this.selectedStoreId !== null) {
      this.viewProducts(this.selectedStoreId);
    }
  }

  viewProducts(storeId: number): void {
    this.selectedStoreId = storeId;
    this.storeService.getProductsByStoreId(storeId).subscribe(products => {
      this.products = [...products.map(product => ({ storeId, product })), ...this.products.filter(p => p.storeId === storeId)];
    });
  }

  editProduct(storeId: number, productId: number): void {
    this.router.navigate(['/edit-product', storeId, productId]);
  }

  deleteProduct(storeId: number, productId: number): void {
    this.storeService.deleteProduct(storeId, productId).subscribe(() => {
      this.products = this.products.filter(p => !(p.storeId === storeId && p.product.id === productId));
      this.updateLocalStorage();
    });
  }

  updateLocalStorage(): void {
    const localProducts = this.products.map(p => p.product);
    localStorage.setItem('products', JSON.stringify(localProducts));
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToAddProduct(): void {
    if (this.selectedStoreId !== null) {
      this.router.navigate(['/add-product', this.selectedStoreId]);
    }
  }

  getStoreName(storeId: number): string {
    const store = this.stores.find(s => s.id === storeId);
    return store ? store.storeName : 'Unknown Store';
  }
}
