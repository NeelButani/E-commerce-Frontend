import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SearchComponent } from './components/search/search.component';
import { BannerComponent } from './components/banner/banner.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';


// prime ng
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { ThankYouComponent } from './components/thank-you/thank-you.component';

const PRIME_NG_UX_MODULES = [
  ButtonModule,
  BadgeModule,
  ToastModule
]


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    SearchComponent,
    BannerComponent,
    FeaturedProductsComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    GalleryComponent,
    CartIconComponent,
    ThankYouComponent,
  ],
  imports: [
    CommonModule,
    ...PRIME_NG_UX_MODULES,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    GalleryComponent,
    CartIconComponent,
    ThankYouComponent
  ]
})
export class SharedModule { }
