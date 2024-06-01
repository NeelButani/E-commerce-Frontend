import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import { ProductsService } from '../../../shared/services/products.service';
import { Product } from '../../../shared/models/product';
import { cartProduts } from '../../../shared/models/cartProducts';
import { CartItem } from '../../../shared/models/cart';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit , OnDestroy{

  cartProducts : cartProduts[] = [];
  cartProduct : Product = {};
  cartCount = 0;
  subscription : Subscription

  constructor(private router: Router, private cartService: CartService, private productService: ProductsService) { }

  ngOnInit(): void {
    this.getAllInitialCart()
  }

  backToShop() {
    this.router.navigate(['/products'])
  }

  deleteCartItem(cartItem : cartProduts) {
    console.log("cartItem",cartItem);
    this.cartService.deleteCartItem(cartItem.product.id)
  }

  private getAllInitialCart() {
   this.subscription =  this.cartService.cart$.subscribe((cart) => {
      this.cartProducts = [];
      this.cartCount = cart?.items?.length ?? 0;
      cart.items.forEach(async (cartItem) => {
       this.cartProduct = await this.productService.getProduct(cartItem.productId)
       this.cartProducts.push({
        product :  this.cartProduct,
        quantity : cartItem.quantity
       })
      })
    })
  }

  updateCartItemQuantity(event, cartItem: cartProduts) {
    this.cartService.addProductToCart(
      {
        productId: cartItem.product.id,
        quantity: event.value
      },  
      true
    );
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
