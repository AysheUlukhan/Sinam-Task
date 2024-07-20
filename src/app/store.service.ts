import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, Product } from './store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private jsonUrl = 'assets/stores.json';
  private stores: Store[] = [];

  constructor(private http: HttpClient) { }

  getStores(): Observable<{ stores: Store[] }> {
    return new Observable((observer) => {
      if (this.stores.length > 0) {
        observer.next({ stores: this.stores });
        observer.complete();
      } else {
        this.http.get<{ stores: Store[] }>(this.jsonUrl).subscribe(data => {
          this.stores = data.stores;
          observer.next(data);
          observer.complete();
        });
      }
    });
  }

  getProductsByStoreId(storeId: number): Observable<Product[]> {
    return new Observable((observer) => {
      this.getStores().subscribe(data => {
        const store = data.stores.find((store: Store) => store.id === storeId);
        if (store) {
          observer.next(store.products);
        } else {
          observer.next([]);
        }
        observer.complete();
      });
    });
  }

  getProductById(storeId: number, productId: number): Observable<Product | undefined> {
    return new Observable((observer) => {
      this.getStores().subscribe(data => {
        const store = data.stores.find((store: Store) => store.id === storeId);
        const product = store?.products.find((product: Product) => product.id === productId);
        observer.next(product);
        observer.complete();
      });
    });
  }

  updateProduct(storeId: number, updatedProduct: Product): Observable<void> {
    return new Observable((observer) => {
      this.getStores().subscribe(() => {
        const store = this.stores.find((store: Store) => store.id === storeId);
        if (store) {
          const productIndex = store.products.findIndex((product: Product) => product.id === updatedProduct.id);
          if (productIndex !== -1) {
            store.products[productIndex] = updatedProduct;
          }
        }
        observer.next();
        observer.complete();
      });
    });
  }

  deleteProduct(storeId: number, productId: number): Observable<void> {
    return new Observable((observer) => {
      this.getStores().subscribe(() => {
        const store = this.stores.find((store: Store) => store.id === storeId);
        if (store) {
          const productIndex = store.products.findIndex((product: Product) => product.id === productId);
          if (productIndex !== -1) {
            store.products.splice(productIndex, 1);
          }
        }
        observer.next();
        observer.complete();
      });
    });
  }

  addProduct(storeId: number, newProduct: Product): Observable<void> {
    return new Observable((observer) => {
      this.getStores().subscribe(() => {
        const store = this.stores.find((store: Store) => store.id === storeId);
        if (store) {
          newProduct.id = Math.max(...store.products.map(p => p.id), 0) + 1; // Generate new ID
          store.products.push(newProduct);
        }
        observer.next();
        observer.complete();
      });
    });
  }
}
