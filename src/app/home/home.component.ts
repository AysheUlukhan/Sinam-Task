import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../store.service';
import { Store, Product } from '../store.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stores: Store[] = [];
  searchTerm: string = '';
  searchResults: Product[] = [];

  constructor(private storeService: StoreService, private router: Router) {}

  ngOnInit(): void {
    this.storeService.getStores().subscribe(data => {
      this.stores = data.stores;
    });
  }

  searchProducts(): void {
    this.searchResults = [];
    const seenProductNames = new Set<string>(); // Görülmüş məhsul adlarını izləmək üçün Set

    if (this.searchTerm) {
      this.stores.forEach(store => {
        store.products.forEach(product => {
          if (product.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) && !seenProductNames.has(product.productName)) {
            this.searchResults.push(product);
            seenProductNames.add(product.productName); // Məhsul adını qeyd et
          }
        });
      });
    }
    
    if (this.searchResults.length === 0) {
      console.log('Məhsul tapılmadı');
    }
  }

  viewProductDetails(product: Product): void {
    this.router.navigate(['/product-detail', product.id]);
  }
}
