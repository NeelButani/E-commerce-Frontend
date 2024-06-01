import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../../shared/models/category';
import { CategoriesService } from '../../../../../shared/services/categories.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit , OnDestroy{

  form!: FormGroup;
  editMode: boolean = false;
  currentCategoryId: string = '';
  subscription : Subscription[] = []

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeCategoryForm();
    this.checkEditMode();
  }


  initializeCategoryForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    })
  }

  validationMessages = {
    categoryName: [
      { type: 'required', message: "Name is required" }
    ],
    categoryIcon: [
      { type: 'required', message: "Icon is required" }
    ]
  }

  isInvalid(controlName: string, type: string) {
    const control = this.form.get(controlName);
    return (control?.dirty || control?.touched) && control.hasError(type);
  }

  async onSubmit() {
    const category: Category = {
      name: this.form.value.name,
      icon: this.form.value.icon,
      color: this.form.value.color,
    }

    if (this.editMode) {
      this._updateCategory(this.currentCategoryId, category)
    } else {
      this._createCategory(category)
    }

  }


  async _updateCategory(categoryId: String, category: Category) {
    try {
      const result = await this.categoryService.updateCategory(categoryId, category);
      if (result) {
        // to add the toaster
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: "Category is updated."
        })

        // if category created navigate to category-list
        setTimeout(() => {
          this.router.navigate(['/categories'])
        }, 2000);
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: "Category not updated!"
      })
      console.error("Error while updating category", error);
    }

  }

  async _createCategory(category: Category) {
    try {
      const result = await this.categoryService.createCategory(category);
      if (result) {
        // to add the toaster
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: "Category is created."
        })

        // if category created navigate to category-list
        setTimeout(() => {
          this.router.navigate(['/categories'])
        }, 2000);
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: "Category not created!"
      })
      console.error("Error while creating category", error);
    }
  }


  async checkEditMode() {
    try {
    this.subscription.push(
      this.activatedRoute.params.subscribe(async (params) => {
        if (params.id) {
          this.editMode = true;
          this.currentCategoryId = params.id;
          let category = await this.categoryService.getCategory(params.id);
          if (category) {
            this.form.get('name')?.setValue(category.name);
            this.form.get('icon')?.setValue(category.icon);
            this.form.get('color')?.setValue(category.color);
          }
        }
      })
    )  
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy(): void {
      this.subscription.forEach((subscription) => {
         subscription.unsubscribe();
      })
      console.log("ngOnDestroy called");
  }
}

