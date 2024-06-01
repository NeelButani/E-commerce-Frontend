import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopFrontComponent } from './shop-front/shop-front.component';
import { HomePageComponent } from './shop-front/home-page/home-page.component';
import { ProductCatelogComponent } from './shop-front/product-catelog/product-catelog.component';
import { ProductDetailComponent } from './shop-front/product-detail/product-detail.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankYouComponent } from '../../shared/components/thank-you/thank-you.component';
import { authGuard } from '../../shared/guards/auth.guard';

const routes: Routes = [
  {
    path : '',
    component : ShopFrontComponent,
    children : [
      {
        path : '',
        component : HomePageComponent
      },
      {
        path : 'products',
        component : ProductCatelogComponent
      },
      {
        path : 'products/:productId',
        component : ProductDetailComponent
      },
      {
        path : 'categories/:categoryId',
        component : ProductCatelogComponent
      },
      {
        path : 'cart',
        component : CartPageComponent
      },
      {
        path : 'checkout',
        canActivate : [authGuard],
        component : CheckoutComponent
      },
      {
        path : 'success',
        component : ThankYouComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
