import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../../shared/services/users.service';
import { Order } from '../../../shared/models/order';
import { OrderItem } from '../../../shared/models/orderItem';
import { Cart } from '../../../shared/models/cart';
import { CartService } from '../../../shared/services/cart.service';
import { OrdersService } from '../../../shared/services/orders.service';
import { Subject, take, takeUntil } from 'rxjs';
import { User } from '../../../shared/models/user';
import { Store } from '@ngrx/store';
import { buildUserSession } from '../../auth/store/users.actions';
import { LocalStoageService } from '../../../shared/services/local-stoage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit, OnDestroy {

  checkoutFormGroup: FormGroup
  countries = []
  userId: string
  orderItems: OrderItem[] = [];
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private router: Router, private userService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrdersService,
    private store: Store,
    private localStorageService: LocalStoageService
  ) { }

  async ngOnInit(): Promise<void> {
    this._initCheckoutForm();
    this._getCountries();
    this._getCartItems();
    // this.dispatchCheckUserSessionAction();
    // this._autoFillData();
    this.getCurrentUserAndFillForm()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }


  async getCurrentUserAndFillForm() {
     this.userId = this.localStorageService.getUserIdfromToken();
    const user = await this.userService.getUser(this.userId);
    if(user){
      this.checkoutForm.name.setValue(user.name)
      this.checkoutForm.email.setValue(user.email)
      this.checkoutForm.phone.setValue(user.phone)
      this.checkoutForm.city.setValue(user.city);
      this.checkoutForm.country.setValue(user.country);
      this.checkoutForm.zip.setValue(user.zip);
      this.checkoutForm.apartment.setValue(user.apartment);
      this.checkoutForm.street.setValue(user.street);
      
    }
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    });
  }

  private _getCountries() {
    this.countries = this.userService.getCountries();
    console.log("List of all countries with id and name", this.countries);

  }

  backToShopping() {
    this.router.navigate(['cart'])
  }

  async placeOrder() {
    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    console.log("After Order place : Order", order);
    try {
      const result = await this.orderService.createOrder(order);
      if (result) {
        this.cartService.emptyCart();
        console.log("Order Sucess", result);
        this.router.navigate(['/success']);
      }

    } catch (error) {
      console.error(error);
    }

  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  validationMessages = {
    name: [
      { type: 'required', message: "Name is required" }
    ],
    email: [
      { type: 'required', message: "Email is required" },
      { type: 'email', message: "Enter Valid Email" }
    ],
    phone: [
      { type: 'required', message: "Number is required" }
    ],
    city: [
      { type: 'required', message: "City name is required" }
    ],
    appartment: [
      { type: 'required', message: "Enter Appartment name" }
    ],
    street: [
      { type: 'required', message: "Enter Street name" }
    ],
    country: [
      { type: 'required', message: "Please select country" }
    ],
    zip: [
      { type: 'required', message: "Please Enter zip Code" }
    ],
  }

  isInvalid(controlName: string, type: string) {
    const control = this.checkoutFormGroup.get(controlName);
    return (control?.dirty || control?.touched) && control.hasError(type);
  }

  // ngrx , need to implement

  // private dispatchCheckUserSessionAction(): void {
  //   this.store.dispatch(buildUserSession());
  // }


  // private _autoFillData() {
  //   this.userService.observeCurrentUser().pipe(takeUntil(this.unsubscribe$)).subscribe((user: any) => {
  //     this.checkoutForm.name.setValue(user.name)
  //   })
  // }
}
