import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../../../../../shared/models/user';
import { UsersService } from '../../../../../shared/services/users.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit , OnDestroy{


  form!: FormGroup;
  editmode: boolean = false;
  currentUserId: string = '';
  countries = [];
  subscription : Subscription

   constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService : UsersService
   ){}

   ngOnInit(): void {
    this._initUserForm();
    this._checkEditMode();  
    this._getCountries();
   }

   private _initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
  }


  private _checkEditMode() {
    try {
   this.subscription =  this.activatedRoute.params.subscribe(async (params) => {
        if (params.id) {
          this.editmode = true;
          this.currentUserId = params.id;
          let user = await this.userService.getUser(params.id);
          console.log(user);
          
          if (user) {
            this.form.get('name')?.setValue(user.name);
            // this.userForm.name.setValue(user.name);
            this.userForm.email.setValue(user.email);
            this.userForm.phone.setValue(user.phone);
            this.userForm.isAdmin.setValue(user.isAdmin);
            this.userForm.street.setValue(user.street);
            this.userForm.apartment.setValue(user.apartment);
            this.userForm.zip.setValue(user.zip);
            this.userForm.city.setValue(user.city);
            this.userForm.country.setValue(user.country);
  
            this.userForm.password.setValidators([]);
            this.userForm.password.updateValueAndValidity();
          }
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  private _getCountries(){
   this.countries  = this.userService.getCountries(); 
   console.log("List of all countries with id and name",this.countries);
   
  }
  validationMessages = {
    name: [
      { type: 'required', message: "Name is required" }
    ],
    email: [
      { type: 'required', message: "Email is required" },
      { type: 'email', message: "Enter Valid Email" }
    ],
    password: [
      { type: 'required', message: "Password is required" }
    ],
    phone: [
      { type: 'required', message: "Number is required" }
    ]
  }


  isInvalid(controlName: string, type: string) {
    const control = this.form.get(controlName);
    return (control?.dirty || control?.touched) && control.hasError(type);
  }
  
  onSubmit(){
    const user: User = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      phone: this.form.value.phone,
      isAdmin: this.form.value.isAdmin,
      street: this.form.value.street,
      apartment: this.form.value.apartment,
      zip: this.form.value.zip,
      city: this.form.value.city,
      country: this.form.value.country,
    }
    if (this.editmode) {
      this._updateUser(this.currentUserId , user);
    } else {
      this._addUser(user);
    }    
  }
 
  async _updateUser(currentUserId : string, user : User){
    try {
      const result = await this.userService.updateUser(currentUserId, user);
      if (result) {
        // to add the toaster
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: "User is updated."
        })

        // if category created navigate to category-list
        setTimeout(() => {
          this.router.navigate(['/users'])
        }, 2000);
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: "User not updated!"
      })
      console.error("Error while updating user", error);
    }

  }

  async _addUser(user : User){
    try {
      const result = await this.userService.createUser(user);
      if (result) {
        // to add the toaster
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: "User is created."
        })

        // if category created navigate to category-list
        setTimeout(() => {
          this.router.navigate(['/users'])
        }, 2000);
      }
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: "user not created!"
      })
      console.error("Error while creating user", error);
    }

  }

  get userForm() {
    return this.form.controls;
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
