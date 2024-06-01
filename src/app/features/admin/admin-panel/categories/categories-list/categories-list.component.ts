import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../../shared/models/category';
import { CategoriesService } from '../../../../../shared/services/categories.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoryService : CategoriesService,
    private messageService : MessageService,
    private router : Router
    ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }


  // to get all the categories
  async getAllCategory(){
   try{
     this.categories = await this.categoryService.getCategories();
   }catch(error){
    console.error("Category-List component : Could not get category",error);
    
   }
  }

  // to delete a category
  async deleteCategory(categoryId : any){
     try{
      const result = await this.categoryService.deleteCategory(categoryId);
      this.getAllCategory()
      if(result){
        // to add the toaster
        this.messageService.add({
          severity : 'success',
          summary : 'Success',
          detail : "Category deleted."
        })   
      }
     }catch(error){
      this.messageService.add({
        severity : 'error',
        summary : 'Error',
        detail : "Category not deleted"
      })
      console.error("Category-List component : Could not delete category",error);
     }
   }

 // to edit a category
  editCategory(categoryId : any){
    this.router.navigate([`/categories/form/${categoryId}`])
  } 

}
