import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../shared/services/products.service';
import { Product } from '../../../../shared/models/product';
import { CategoriesService } from '../../../../shared/services/categories.service';
import { Category } from '../../../../shared/models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-catelog',
  templateUrl: './product-catelog.component.html',
  styleUrl: './product-catelog.component.scss'
})
export class ProductCatelogComponent implements OnInit {

  products : Product[] = []
  categories : Category[] = [];
  isFromCategoryPage : boolean = false;

  constructor(private productService : ProductsService ,
    private categoryService : CategoriesService,
    private route : ActivatedRoute
  ){

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if(params && params.categoryId){
        this.getProducts([params.categoryId]);
        this.isFromCategoryPage = true
      } else {
        this.getProducts();
        this.isFromCategoryPage = false
      }
    })
    this.getCategories();
  }

  // initializeDefaultValueForCheckBoc(){
  //   this.categories.forEach((category) => {
  //     category.checked = false
  //   })
  //   console.log(this.categories);
  // }

  async getProducts(categoriesFilter?: string[]){
    this.products = await this.productService.getProducts(categoriesFilter);   
  }

  async getCategories(){
    this.categories = await this.categoryService.getCategories()
    // this.initializeDefaultValueForCheckBoc()
  }

  onCategoryChange(){
     const selectedCategory = this.categories.filter((category) => {
         return category.checked
     }).map((category) => {
        return category.id
     })

     this.getProducts(selectedCategory)
  }
}
