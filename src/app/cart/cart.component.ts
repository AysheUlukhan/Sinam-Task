import { Component, OnInit } from '@angular/core';
import { Product } from '../store.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];
  totalPrice: number = 0; 

  ngOnInit(): void {
    this.loadCartProducts();
  }

  loadCartProducts(): void {
    this.cartProducts = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartProducts.forEach((product: Product) => {
      if (product.quantity === undefined) {
        product.quantity = 1;
      }
    });
    this.calculateTotalPrice();
  }

  deleteProduct(productToDelete: Product): void {
    let cartProducts = JSON.parse(localStorage.getItem('cart') || '[]');
    cartProducts = cartProducts.filter((product: Product) => product.id !== productToDelete.id);
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    this.cartProducts = cartProducts;
    this.calculateTotalPrice();
  }

  changeQuantity(product: Product, change: number): void {
    let cartProducts = JSON.parse(localStorage.getItem('cart') || '[]');
    const productIndex = cartProducts.findIndex((p: Product) => p.id === product.id);

    if (productIndex > -1) {
      const currentQuantity = cartProducts[productIndex].quantity || 1;
      const newQuantity = currentQuantity + change;

      if (newQuantity > 0) {
        cartProducts[productIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cartProducts));
        this.cartProducts = cartProducts;
        this.calculateTotalPrice();
      }
    }
  }

  updateQuantity(product: Product): void {
    let cartProducts = JSON.parse(localStorage.getItem('cart') || '[]');
    const productIndex = cartProducts.findIndex((p: Product) => p.id === product.id);

    if (productIndex > -1) {
      const newQuantity = product.quantity;

      if (newQuantity !== undefined && newQuantity > 0) {
        cartProducts[productIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cartProducts));
        this.cartProducts = cartProducts;
        this.calculateTotalPrice();
      }
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartProducts.reduce((total, product) => {
      return total + (product.price * (product.quantity || 1));
    }, 0);
  }
}
