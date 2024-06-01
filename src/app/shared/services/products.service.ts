import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService : ApiService) { }

  getProducts(categoriesFilter? : String[]): Promise<Product[]>{
    try{
      return this.apiService.getProducts(categoriesFilter);
    }catch(error){
      console.error("Product service: error while getting products", error);
      throw error;       
    }
  }

  getProductsCount(){
    try{
      return this.apiService.getProductCount();
    }catch(error){
      console.error("Product service: error while getting products count", error);
      throw error;       
    }
  }


  addProduct(productFormData  : FormData){
    try{
      return this.apiService.addProduct(productFormData);
    }catch(error){
      console.error("Product service: error while getting products", error);
      throw error;       
    }
  }


  getProduct(productId : any){
    try{
      return this.apiService.getProduct(productId)
    }catch(error){
      console.error("Category service: error while fetching Product", error);
      throw error;      
    }
  }

  updateProduct(productId : any , productFormData : FormData){
    try{
      return this.apiService.updateProduct(productId,productFormData)
    }catch(error){
      console.error("Category service: error while updating product", error);
      throw error;
    }
     
  }


  deleteProduct(productId : any){
    try{
      return this.apiService.deleteProduct(productId)
    }catch(error){
      console.error("Category service: error while deleting product", error);
      throw error;      
    }
  }

  getFeaturedProducts(count : number){
    try{
      return this.apiService.getFeaturedProducts(count)
    }catch(error){
      console.error("Category service: error while fetching featured Product", error);
      throw error;      
    }
  }
}
