// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // FormsModule əlavə edin
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { StoreComponent } from './store/store.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CartComponent } from './cart/cart.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    StoreComponent,
    StoreDetailComponent,
    ProductDetailComponent,
    EditProductComponent,
    ProductsComponent,
    RegisterComponent,
    AddProductComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
