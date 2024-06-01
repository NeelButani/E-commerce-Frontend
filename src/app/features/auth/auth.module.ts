import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { USERS_FEATURE_KEY, usersReducer } from './store/users.reducer';
import { UsersFacade } from './store/users.facade';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(USERS_FEATURE_KEY , usersReducer)
  ],
  providers : [
    UsersFacade
  ]
})
export class AuthModule { }
