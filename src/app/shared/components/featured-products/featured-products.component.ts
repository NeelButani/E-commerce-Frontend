import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss'
})
export class FeaturedProductsComponent implements OnInit {

  featuredProducts : Product[] = [];
  constructor(private productService : ProductsService){}

  ngOnInit(): void {
      this.getFeaturedProducts();
  }

  async getFeaturedProducts(){
     this.featuredProducts = await this.productService.getFeaturedProducts(4);
     
  }
}
