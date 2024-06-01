import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../../shared/services/categories.service';
import { Category } from '../../../../../shared/models/category';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../../../shared/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {

  editMode : boolean = false;
  productForm! : FormGroup;
  categories : Category[] = [];
  imageDisplay! : string | ArrayBuffer;
  currentProductId : String = '';

  constructor(
    private formBuilder : FormBuilder,
    private categoryService : CategoriesService,
    private messageService: MessageService,
    private productService : ProductsService,
    private route: Router,
    private router : ActivatedRoute
  ) {
     
  }
 
  ngOnInit(): void {
      this.initializeProductForm();
      this.initializeCategoryDropDown();
      this.checkEditMode();
  }

  private async initializeCategoryDropDown(){
    this.categories = await this.categoryService.getCategories();
  }

  validationMessages = {
    productName: [
      { type: 'required', message: "Name is required" }
    ],
    brand: [
      { type: 'required', message: "Brand is required" }
    ],
    price: [
      { type: 'required', message: "Price is required" }
    ],
    countInStock : [
      { type: 'required', message: "Stock is required" }
    ],
    category : [
      { type: 'required', message: "Category is required" }
    ],
    description : [
      { type: 'required', message: "Description is required" }
    ],
    image : [
      { type: 'required', message: "Image is required" }
    ],
  }


  isInvalid(controlName: string, type: string) {
    const control = this.productForm.get(controlName);
    return (control?.dirty || control?.touched) && control.hasError(type);
  }

  initializeProductForm(){
     this.productForm = this.formBuilder.group({
         name : ['', Validators.required],
         brand : ['',Validators.required],
         price : ['',Validators.required],
         category : ['',Validators.required],
         countInStock : ['',Validators.required],
         description : ['',Validators.required],
         richDescription : [''],
         isFeatured : [false],
         image : ['',Validators.required]
     })
  }

  onImageUplaod(event : any){
     const file = event.target.files[0];
     console.log("Product form Component -> Image Upload -> File",file);
     if(file){
      this.productForm.patchValue({image : file})
      this.productForm.get('image')!.updateValueAndValidity()
       const fileReader = new FileReader();
       fileReader.onload = () => {
         this.imageDisplay = fileReader.result!;
        }
        fileReader.readAsDataURL(file);
     }
  }

  onSubmit(){
    const productFormData = new FormData();
    console.log("On Submit -> Product Form data -> values",this.productForm.value);
    Object.keys(this.productForm.value).map((key) => {
      productFormData.append(key,this.productForm.value[key])
    })

    if(this.editMode){
      this.updateProduct(productFormData);
    } else {
      this.addProducts(productFormData);
    }
  }

  private async updateProduct(productFormData : FormData){
    try {
      const result = await this.productService.updateProduct(this.currentProductId, productFormData);
      if (result) {
        // to add the toaster
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: "Product is updated."
        })

        // if category created navigate to category-list
        setTimeout(() => {
          this.route.navigate(['/products'])
        }, 2000);
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: "Product not updated!"
      })
      console.error("Error while updating Product", error);
    }
  }

  private async addProducts(productFormData : FormData){
    try {
      const result = await this.productService.addProduct(productFormData);
      if (result) {
        // to add the toaster
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: "Product is created."
        })

        // if category created navigate to category-list
        setTimeout(() => {
          this.route.navigate(['/products'])
        }, 2000);
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: "Product not created!"
      })
      console.error("Error while creating Product", error);
    }
  }

  private async checkEditMode(){
       this.currentProductId = this.router.snapshot.params['id'];
      if(this.currentProductId){
        this.editMode = true;
        const product = await this.productService.getProduct(this.currentProductId);
        console.log("Edit Mode -> GetProduct() -> Prodct",product);
        this.productForm.get('name')?.setValue(product.name);
        this.productForm.get('category')?.setValue(product.category?.id);
        this.productForm.get('brand')?.setValue(product.brand);
        this.productForm.get('price')?.setValue(product.price);
        this.productForm.get('countInStock')?.setValue(product.countInStock);
        this.productForm.get('isFeatured')?.setValue(product.isFeatured);
        this.productForm.get('description')?.setValue(product.description);
        this.productForm.get('richDescription')?.setValue(product.description);
        this.productForm.get('image')?.setValidators([]);
        this.productForm.get('image')?.updateValueAndValidity();

        this.imageDisplay = product.image!;
      }
  }
}
