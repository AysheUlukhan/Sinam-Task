import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../store.service';
import { Product, Store } from '../store.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  stores: Store[] = [];
  categories: string[] = [];
  selectedStoreId: number | null = null;
  product: Product = { id: 0, productName: '', price: 0, img: '', category: '', storeId: 0 };
  error: string = '';

  constructor(
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.storeService.getStores().subscribe(data => {
      this.stores = data.stores;
      this.extractCategories();
    });
  }

  extractCategories(): void {
    const allCategories = new Set<string>();
    this.stores.forEach(store => {
      store.products.forEach(product => {
        allCategories.add(product.category);
      });
    });
    this.categories = Array.from(allCategories);
  }

  addProduct(): void {
    if (!this.product.productName || this.product.price <= 0 || !this.product.img || !this.product.category || !this.selectedStoreId) {
      this.error = 'Please fill in all fields correctly.';
      return;
    }

    this.product.storeId = this.selectedStoreId;

    let products = JSON.parse(localStorage.getItem('products') || '[]');
    this.product.id = products.length ? Math.max(...products.map((p: Product) => p.id)) + 1 : 1;

    products.push(this.product);
    localStorage.setItem('products', JSON.stringify(products));

    alert('Məhsul uğurla əlavə olundu!');
    
    this.router.navigate(['/dashboard']);
  }
}
