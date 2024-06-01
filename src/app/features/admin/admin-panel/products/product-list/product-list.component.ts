import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../shared/models/product';
import { ProductsService } from '../../../../../shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{

  products : Product[] = [];

  ngOnInit(): void {
     this.getAllProducts();
  }

  constructor(
    private productService : ProductsService,
    private route : Router,
    private router : ActivatedRoute,
    private messageService : MessageService,
   ){ 
      
  }


  private async getAllProducts(){
    this.products = await this.productService.getProducts();
    console.log("Product List Component -> getAllProducts() -> product",this.products);
  }


  // to delete a category
  async deleteProduct(productId : any){
    try{
     const result = await this.productService.deleteProduct(productId);
     this.getAllProducts();
     if(result){
       // to add the toaster
       this.messageService.add({
         severity : 'success',
         summary : 'Success',
         detail : "Product deleted."
       })   
     }
    }catch(error){
     this.messageService.add({
       severity : 'error',
       summary : 'Error',
       detail : "Product not deleted"
     })
     console.error("Product-List component : Could not delete Product",error);
    }
  }

  editProduct(productId : any){
      this.route.navigate([`form/${productId}`], {relativeTo : this.router})
  }
}
