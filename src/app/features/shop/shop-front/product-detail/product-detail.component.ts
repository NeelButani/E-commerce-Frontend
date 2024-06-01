import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../shared/models/product';
import { CartService } from '../../../../shared/services/cart.service';
import { CartItem } from '../../../../shared/models/cart';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {


  productId : String = ''
  product : Product;
  quantity = 1;

  constructor(private productService : ProductsService,
    private route : ActivatedRoute,
    private cartService : CartService
  ){}

  ngOnInit(): void {
      this.route.params.subscribe((params) =>{
         if(params && params.productId){
           this.productId = params.productId;
           this.getProduct(this.productId)
         }
      })
  }

  async getProduct(productId){
    this.product = await this.productService.getProduct(productId);
    console.log(this.product);
    
  }

  addProductToCart(){
    const cartItem : CartItem = {
      productId : this.product.id,
      quantity : this.quantity
    }
    this.cartService.addProductToCart(cartItem)
  }
}
