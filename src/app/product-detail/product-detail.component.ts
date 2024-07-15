import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../store.service';
import { Store, Product } from '../store.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  productPrices: { storeName: string; price: number; }[] = [];

  constructor(private route: ActivatedRoute, private storeService: StoreService) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.storeService.getStores().subscribe(data => {
      data.stores.forEach((store: Store) => {
        store.products.forEach((product: Product) => {
          if (product.id.toString() === productId) {
            this.product = product;
          }
          if (product.productName === this.product?.productName) {
            this.productPrices.push({ storeName: store.storeName, price: product.price });
          }
        });
      });
    });
  }
}
