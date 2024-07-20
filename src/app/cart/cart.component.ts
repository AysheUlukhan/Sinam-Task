import { Component, OnInit } from '@angular/core';
import { Product } from '../store.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];

  ngOnInit(): void {
    this.loadCartProducts();
  }

  loadCartProducts(): void {
    this.cartProducts = JSON.parse(localStorage.getItem('cart') || '[]');

    // Hər məhsul üçün başlanğıc miqdarını təyin edin
    this.cartProducts.forEach((product: Product) => {
      if (product.quantity === undefined) {
        product.quantity = 1; // Əgər miqdar təyin edilməmişsə, 1 olaraq təyin edin
      }
    });
  }

  deleteProduct(productToDelete: Product): void {
    // localStorage-dan məhsulu sil
    let cartProducts = JSON.parse(localStorage.getItem('cart') || '[]');
    cartProducts = cartProducts.filter((product: Product) => product.id !== productToDelete.id);
    localStorage.setItem('cart', JSON.stringify(cartProducts));

    // Məhsul siyahısını yenilə
    this.cartProducts = cartProducts;
  }

  changeQuantity(product: Product, change: number): void {
    // localStorage-dan məhsulun miqdarını artırıb-azalt
    let cartProducts = JSON.parse(localStorage.getItem('cart') || '[]');
    const productIndex = cartProducts.findIndex((p: Product) => p.id === product.id);

    if (productIndex > -1) {
      const currentQuantity = cartProducts[productIndex].quantity || 1;
      const newQuantity = currentQuantity + change;
      
      if (newQuantity > 0) { // Miqdar mənfi olmamalıdır
        cartProducts[productIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cartProducts));

        // Məhsul siyahısını yenilə
        this.cartProducts = cartProducts;
      }
    }
  }
}
  