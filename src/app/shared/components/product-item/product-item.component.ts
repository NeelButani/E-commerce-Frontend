import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

  constructor(private router : Router, private cartService : CartService, private messageService : MessageService,){

  }
  @Input() product : Product

  navigateToProductDetail(productId){
    this.router.navigate(['products',productId])
  }

  addProductToCart(){
   const cartItem : CartItem = {
    productId : this.product.id,
    quantity : 1
  };
   this.cartService.addProductToCart(cartItem);
  }
}
