// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { StoreComponent } from './store/store.component';
import { StoreDetailComponent } from './store-detail/store-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'stores', component: StoreComponent },
  { path: 'store-detail/:id', component: StoreDetailComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'edit-product/:storeId/:id', component: EditProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
