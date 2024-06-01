import { NgModule } from '@angular/core';
import { RouterModule, Routes, withEnabledBlockingInitialNavigation } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { CategoriesListComponent } from './admin-panel/categories/categories-list/categories-list.component';
import { CategoryFormComponent } from './admin-panel/categories/category-form/category-form.component';
import { ProductListComponent } from './admin-panel/products/product-list/product-list.component';
import { ProductFormComponent } from './admin-panel/products/product-form/product-form.component';
import { UserListComponent } from './admin-panel/users/user-list/user-list.component';
import { UserFormComponent } from './admin-panel/users/user-form/user-form.component';
import { OrdersListComponent } from './admin-panel/orders/orders-list/orders-list.component';
import { OrderDetailComponent } from './admin-panel/orders/order-detail/order-detail.component';
import { authGuard } from '../../shared/guards/auth.guard';


const routes: Routes = [
  {
    path: 'admin',
    canActivate : [authGuard],
    component: AdminPanelComponent,
    children : [
      {
        path : 'admin',
        component : DashboardComponent
      },
      {
        path : 'categories',
        component : CategoriesListComponent
      },
      {
        path : 'categories/form',
        component : CategoryFormComponent
      },
      {
        path : 'categories/form/:id',
        component : CategoryFormComponent
      },
      {
        path : 'products',
        component : ProductListComponent
      },
      {
        path : 'products/form',
        component : ProductFormComponent
      },
      {
        path : 'products/form/:id',
        component : ProductFormComponent
      },
      {
        path : 'users',
        component : UserListComponent
      },
      {
        path : 'users/form',
        component : UserFormComponent
      },
      {
        path : 'users/form/:id',
        component : UserFormComponent
      },
      {
        path : 'orders',
        component : OrdersListComponent
      },
      {
        path : 'orders/:id',
        component : OrderDetailComponent
      },
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
