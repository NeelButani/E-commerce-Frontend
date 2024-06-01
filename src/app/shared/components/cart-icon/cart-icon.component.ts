import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.scss'
})
export class CartIconComponent implements OnInit {

  cartCount : number = 0;
  constructor(private cartService : CartService){

  }

  ngOnInit(): void {
     this.cartService.cart$.subscribe((cart) => {
       this.cartCount = cart?.items?.length ?? 0;
     })
  }
}
