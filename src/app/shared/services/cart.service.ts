import { Injectable } from '@angular/core';
import { LocalStoageService } from './local-stoage.service';
import { Cart, CartItem } from '../models/cart';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$ : BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());


  constructor(private localStorageService : LocalStoageService , private messageService : MessageService) { }

  initEmptyCart(){
    const cart : Cart = JSON.parse(this.localStorageService.getItem('cart'));
    if(!cart){
      const intialCart = {
        items : []
      };
      this.setCart(intialCart);
    }
  }

  getCart() : Cart{
    const cartJSONString : string = this.localStorageService.getItem('cart');
    const cart : Cart = JSON.parse(cartJSONString);
    return cart
  }

  setCart(cart : Cart) {
    const cartJSONString = JSON.stringify(cart);
    this.localStorageService.setItem('cart',cartJSONString)
  }

   addProductToCart(cartItem : CartItem , updateCartItem: boolean = false) : Cart{
    const cart = this.getCart();

    const cartItemExists = cart.items.find(item => {
      return item.productId == cartItem.productId
    });
   
    if(cartItemExists){
      cart.items.map((item) => {
        if(item.productId === cartItem.productId){
          if(updateCartItem){
            item.quantity = cartItem.quantity
          } else {
            item.quantity = item.quantity + cartItem.quantity
          }
        }
      }) 
    } else{
      cart.items.push(cartItem);
    }
    this.setCart(cart);
    this.cart$.next(cart);
    
    this.messageService.add({
      severity: 'success',
      detail: `Cart Updated`,
      summary : 'Success',
    });

    return cart;
  }

  deleteCartItem(productId : string){
      
     const cart : Cart = this.getCart();

     const index = cart.items.findIndex((item) => {
       return item.productId === productId
     })
     console.log(index);
     if(index !== -1){
        cart.items.splice(index,1);
        this.setCart(cart);
        this.cart$.next(cart);

        this.messageService.add({
          severity: 'success',
          detail: `Cart Updated`,
          summary : 'Success',
        });
    
     }
  }

  emptyCart() {
    const intialCart = {
      items: []
    };
    this.setCart(intialCart);
    this.cart$.next(intialCart);
  }

}
