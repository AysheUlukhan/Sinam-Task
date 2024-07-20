import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Store, Product } from '../store.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  stores: Store[] = [];
  selectedStore: Store | null = null;
  categories: string[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string | null = null; // Seçilən kateqoriyanı saxlamaq üçün

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.getStores().subscribe(data => {
      this.stores = data.stores;
      if (this.stores.length > 0) {
        this.selectStore(this.stores[0]); // ilk mağazanı seçirik
      }
    });
  }

  extractCategories(): void {
    const categorySet = new Set<string>();
    this.stores.forEach(store => {
      store.products.forEach(product => {
        categorySet.add(product.category);
      });
    });
    this.categories = Array.from(categorySet);
  }

  selectStore(store: Store) {
    this.selectedStore = store;
    this.selectedCategory = null; // Kateqoriya seçimlərini sıfırlamaq
    this.filteredProducts = store.products;
    this.extractCategories();
  }

  filterProductsByCategory(category: string): void {
    this.selectedCategory = category;
    if (this.selectedStore) {
      this.filteredProducts = this.selectedStore.products.filter(product => product.category === category);
    }
  }

  addToCart(product: Product): void {
    let cartProducts = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Məhsulu tap
    const existingProduct = cartProducts.find((p: Product) => p.id === product.id);
    
    if (existingProduct) {
      // Məhsul varsa, miqdarı artır
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      // Məhsul yoxdursa, miqdarını təyin et və əlavə et
      product.quantity = 1;
      cartProducts.push(product);
    }
    
    // Yenidən localStorage-a yaz
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    alert(`${product.productName} added to cart.`);
  }
}
