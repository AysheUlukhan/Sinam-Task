import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../store.service';
import { Product } from '../store.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product | undefined;
  storeId: number = 0;

  constructor(private route: ActivatedRoute, private storeService: StoreService, private router: Router) { }

  ngOnInit(): void {
    const storeId = +this.route.snapshot.paramMap.get('storeId')!;
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.storeId = storeId;

    this.storeService.getProductById(storeId, productId).subscribe(product => {
      this.product = product;
    });
  }

  saveProduct(): void {
    if (this.product) {
      this.storeService.updateProduct(this.storeId, this.product).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
