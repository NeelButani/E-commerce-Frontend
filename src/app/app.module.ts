import {NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminRoutingModule } from './features/admin/admin-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './features/admin/admin.module';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthRoutingModule } from './features/auth/auth-routing.module';
import { AuthModule } from './features/auth/auth.module';
import { jwtInterceptor } from './shared/interceptor/jwt.interceptor';
import { ShopModule } from './features/shop/shop.module';
import { ShopRoutingModule } from './features/shop/shop-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule,
    AdminModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthRoutingModule,
    AuthModule,
    ShopModule,
    ShopRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot({})
  ],
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
