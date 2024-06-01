import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../../../shared/services/orders.service';
import { Order } from '../../../../../shared/models/order';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {

  order: Order;
  orderStatus = [];
  selectedStatus
  orderId : string
  constructor(private orderService: OrdersService,
    private route : ActivatedRoute,
    private messageService: MessageService,
  ) {

  }

  ngOnInit() {
    this.getOrder();
    this.mapOrderStatus();
  }

  private async getOrder() {

    this.orderId = this.route.snapshot.params.id
    this.order = await this.orderService.getOrder(this.orderId);
    console.log("order-detail component -> order", this.order);

    // to initialize the orderStatus
    this.selectedStatus = this.order.status
  }

  private mapOrderStatus(){
   const orderStatusObjetc =  this.orderService.getOrderStatusObject();
   this.orderStatus = Object.keys(orderStatusObjetc).map((key) => {
      return {
        id : key,
        name : orderStatusObjetc[key].label
      }
   });   

  }

  onStatusChange(event){
     const status = event.value;
     const statusObject = {
      status : status
     }
     try{
       const result = this.orderService.updateOrderStatus(statusObject,this.orderId);
       if (result) {
        // to add the toaster
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: "Status  updated."
        })
      }

     } catch(error){
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: "Category not updated!"
      })
      console.error("Error while updating category", error);
     }
  }
}
