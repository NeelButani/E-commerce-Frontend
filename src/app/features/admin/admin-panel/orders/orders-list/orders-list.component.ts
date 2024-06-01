import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../../shared/models/order';
import { OrdersService } from '../../../../../shared/services/orders.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent implements OnInit {

  orders : Order[] = [];
  orderStatus = {}

  constructor(private orderService : OrdersService, private router : Router,private messageService : MessageService,){
 
  }
 
  ngOnInit(): void {
    this.getAllOrders()
    this.getOrderStatus()
  }

 async getAllOrders(){
    this.orders = await this.orderService.getOrders()
    console.log("order-list Component -> Order List",this.orders);
    
  }

  getOrderStatus(){
    this.orderStatus = this.orderService.getOrderStatusObject();
  }

  async deleteOrder(id){
    try{
      const result = await this.orderService.deleteOrder(id);
      this.getAllOrders()
      if(result){
        // to add the toaster
        this.messageService.add({
          severity : 'success',
          summary : 'Success',
          detail : "Order deleted."
        })   
      }
     }catch(error){
      this.messageService.add({
        severity : 'error',
        summary : 'Error',
        detail : "Order not deleted"
      })
      console.error("Order-List component : Could not delete order",error);
     }
  }

  showOrder(id){
    this.router.navigate(['orders' , id])
  }
}
