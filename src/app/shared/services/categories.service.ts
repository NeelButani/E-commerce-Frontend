import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private apiService : ApiService) { }

  getCategories(): Promise<Category[]>{
    try{
      return this.apiService.getCategories();
    }catch(error){
      console.error("Category service: error while getting category", error);
      throw error;       
    }
  }

  createCategory(category :Category){
    try{
      return this.apiService.postCategory(category)
    }catch(error){
      console.error("Category service: error while creating category", error);
      throw error;
    }
     
  }

  deleteCategory(categoryId : any){
    try{
      return this.apiService.deleteCategory(categoryId)
    }catch(error){
      console.error("Category service: error while deleting category", error);
      throw error;      
    }
  }

  getCategory(categoryId : any){
    try{
      return this.apiService.getCategory(categoryId)
    }catch(error){
      console.error("Category service: error while fetching category", error);
      throw error;      
    }
  }


  updateCategory(categoryId : any , category :Category){
    try{
      return this.apiService.updateCategory(categoryId,category)
    }catch(error){
      console.error("Category service: error while updating category", error);
      throw error;
    }
     
  }
  
}
