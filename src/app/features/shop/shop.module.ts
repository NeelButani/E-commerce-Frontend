import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopFrontComponent } from './shop-front/shop-front.component';
import { SharedModule } from '../../shared/shared.module';
import { HomePageComponent } from './shop-front/home-page/home-page.component';
import { ProductCatelogComponent } from './shop-front/product-catelog/product-catelog.component';

import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './shop-front/product-detail/product-detail.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../shared/services/cart.service';
import { ToastModule } from 'primeng/toast';
import { CartPageComponent } from './cart-page/cart-page.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DropdownModule } from 'primeng/dropdown';

const PRIME_NG_UX_MODULES = [
  CheckboxModule,
  RatingModule,
  InputNumberModule,
  ButtonModule,
  ToastModule,
  DropdownModule
]

@NgModule({
  declarations: [
    ShopFrontComponent,
    HomePageComponent,
    ProductCatelogComponent,
    ProductDetailComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    ...PRIME_NG_UX_MODULES,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShopModule { 
  constructor(private cartService : CartService){
    cartService.initEmptyCart();
  }
}
