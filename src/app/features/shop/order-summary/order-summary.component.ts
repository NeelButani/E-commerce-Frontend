import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { ProductsService } from '../../../shared/services/products.service';
import { Product } from '../../../shared/models/product';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent implements OnInit , OnDestroy{

  totalPrice: number;
  isCheckout = false;
  subscription : Subscription

  constructor(private router : Router , private cartService : CartService, private productService : ProductsService){
    this.router.url.includes('checkout') ? (this.isCheckout = true) : (this.isCheckout = false)
  }

  ngOnInit(): void {
      this.getOrderSummary()
  }

  navigateToCheckout(){
    this.router.navigate(['checkout'])
  }

  private getOrderSummary(){
    this.subscription =   this.cartService.cart$.subscribe((cart) => {
        this.totalPrice = 0;
        if(cart){
          cart.items.map(async (item) => {
            const product : Product = await this.productService.getProduct(item.productId);
            this.totalPrice += product.price * item.quantity;
          })
        }
      })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
