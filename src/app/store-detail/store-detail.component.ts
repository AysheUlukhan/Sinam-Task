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
    if (this.store) {
      this.filteredProducts = this.store.products.filter((product: Product) => product.category === category);
    }
  }

  searchProducts(): void {
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
}
