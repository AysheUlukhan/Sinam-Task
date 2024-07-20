import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../store.service';
import { Product, Store } from '../store.model';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css']
})
export class StoreDetailComponent implements OnInit {
  store: Store | undefined;
  categories: string[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(private route: ActivatedRoute, private storeService: StoreService) { }

  ngOnInit(): void {
    const storeId = this.route.snapshot.paramMap.get('id');
    this.storeService.getStores().subscribe(data => {
      this.store = data.stores.find((store: Store) => store.id.toString() === storeId);
      if (this.store) {
        this.filteredProducts = this.store.products;
        this.categories = Array.from(new Set(this.store.products.map((product: Product) => product.category)));
      }
    });
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    if (this.store) {
      this.filteredProducts = this.store.products.filter((product: Product) => product.category === category);
    }
  }

  searchProducts(): void {
    this.selectedCategory = ''; 
    if (this.store) {
      if (this.searchTerm.trim() === '') {
        this.filteredProducts = this.store.products;
      } else {
        this.filteredProducts = this.store.products.filter((product: Product) =>
          product.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
    }
  }

  addToCart(product: Product): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find((p: Product) => p.id === product.id);

    if (existingProduct) {
      // Məhsul varsa, miqdarını artır
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      // Məhsul yoxdursa, miqdarını təyin et və əlavə et
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.productName} added to cart.`);
  }
}
