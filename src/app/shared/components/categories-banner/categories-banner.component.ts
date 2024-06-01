import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrl: './categories-banner.component.scss'
})
export class CategoriesBannerComponent implements OnInit {

  categories : Category[] = [];

  constructor(private categoryService : CategoriesService , private router : Router){}

  ngOnInit() { 
    this.getCategories();
  }

  async getCategories(){
    this.categories = await this.categoryService.getCategories();
    console.log(this.categories);
    
  }

  navigateToCategory(categoryId){
    this.router.navigate(['/categories',categoryId])
  }
}
