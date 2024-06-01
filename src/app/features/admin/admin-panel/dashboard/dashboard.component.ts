import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, combineLatest, forkJoin } from 'rxjs';
import { UsersService } from '../../../../shared/services/users.service';
import { OrdersService } from '../../../../shared/services/orders.service';
import { ProductsService } from '../../../../shared/services/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit , OnDestroy {

  statistics : any[] =  ['','','',{totalSales : ''}]
  subscription : Subscription;

  constructor(
    private userService : UsersService,
    private orderService : OrdersService,
    private productsService : ProductsService
  ){}

  async ngOnInit() {

    const orderCount$ = await this.orderService.getOrdersCount()
    const userCount$ = await this.userService.getUsersCount();
    const productCount$ = await this.productsService.getProductsCount();
    const totalSales$ = await this.orderService.getOrdersTotalSales();

     this.subscription =  combineLatest([
        orderCount$ , userCount$ , productCount$ , totalSales$
      ]).subscribe((values) => {
         this.statistics = values;
         console.log("All the statistic",this.statistics);
      })
  }
 
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
