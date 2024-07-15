import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Store, Product } from './store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private jsonUrl = 'assets/stores.json';
  private stores: Store[] = [];

  constructor(private http: HttpClient) { }

  getStores(): Observable<any> {
    return new Observable((observer) => {
      if (this.stores.length > 0) {
        observer.next({ stores: this.stores });
        observer.complete();
      } else {
        this.http.get<any>(this.jsonUrl).subscribe(data => {
          this.stores = data.stores;
          observer.next(data);
          observer.complete();
        });
      }
    });
  }

  getProductById(storeId: number, productId: number): Observable<Product | undefined> {
    return new Observable((observer) => {
      this.getStores(). subscribe(data => {
        const store = data.stores.find((store: Store) => store.id === storeId);
        const product = store?.products.find((product: Product) => product.id === productId);
        observer.next(product);
        observer.complete();
      });
    });
  }

  updateProduct(storeId: number, updatedProduct: Product): Observable<void> {
    return new Observable((observer) => {
      this.getStores().subscribe(data => {
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
      this.getStores().subscribe(data => {
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
  
  
}

