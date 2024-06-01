import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AccordionModule } from 'primeng/accordion';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SidebarComponent } from './admin-panel/sidebar/sidebar.component';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { CategoriesListComponent } from './admin-panel/categories/categories-list/categories-list.component';
import { CategoryFormComponent } from './admin-panel/categories/category-form/category-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ng prime imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ProductListComponent } from './admin-panel/products/product-list/product-list.component';
import { ProductFormComponent } from './admin-panel/products/product-form/product-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { UserListComponent } from './admin-panel/users/user-list/user-list.component';
import { UserFormComponent } from './admin-panel/users/user-form/user-form.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { OrdersListComponent } from './admin-panel/orders/orders-list/orders-list.component';
import { OrderDetailComponent } from './admin-panel/orders/order-detail/order-detail.component';
import { FieldsetModule } from 'primeng/fieldset';

const PRIME_NG_UX_MODULES = [
  CardModule,
  ButtonModule,
  ToolbarModule,
  TableModule,
  InputTextModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
  ConfirmDialogModule,
  TagModule,
  FieldsetModule
] 

@NgModule({
  declarations: [  
    AdminPanelComponent, SidebarComponent, DashboardComponent, CategoriesListComponent , CategoryFormComponent, ProductListComponent, ProductFormComponent, UserListComponent, UserFormComponent, OrdersListComponent, OrderDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    AccordionModule,
    ...PRIME_NG_UX_MODULES,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ColorPickerModule,
  ],
  providers: [MessageService,ConfirmationService]
})
export class AdminModule { }
