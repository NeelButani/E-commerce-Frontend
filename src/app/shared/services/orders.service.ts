import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

 constructor(private apiService : ApiService) { }


  orderStatus = {
    0 : {
      label : 'Pending',
      color : 'primary'
    },
    1 : {
      label : 'Proccessed',
      color : 'warning'
    },
    2 : {
      label : 'Shipped',
      color : 'warning'
    },
    3 : {
      label : 'Delivered',
      color : 'success'
    },
    4 : {
      label : 'Failed',
      color : 'danger'
    },
  }


  getOrders(): Promise<Order[]>{
    try{
      return this.apiService.getOrders();
    }catch(error){
      console.error("Order service: error while getting orders", error);
      throw error;       
    }
  }

  createOrder(order :Order){
    try{
      return this.apiService.postOrder(order)
    }catch(error){
      console.error("Order service: error while creating order", error);
      throw error;
    }
     
  }

  deleteOrder(orderId : any){
    try{
      return this.apiService.deleteOrder(orderId)
    }catch(error){
      console.error("Order service: error while deleting order", error);
      throw error;      
    }
  }

  getOrder(orderId : any){
    try{
      return this.apiService.getOrder(orderId)
    }catch(error){
      console.error("Order service: error while fetching order", error);
      throw error;      
    }
  }

  updateOrderStatus(orderStatus , orderId : any){
    try{
      return this.apiService.updateOrderStatus(orderStatus, orderId);
    }catch(error){
      console.error("Order service: error while updating order status", error);
      throw error;      
    }
  }

  getOrderStatusObject(){
    return this.orderStatus
  }

  getOrdersCount(){
    try{
      return this.apiService.getOrderCount();
    }catch(error){
      console.error("Order service: error while getting orders count", error);
      throw error;       
    }
  }

  getOrdersTotalSales(){
    try{
      return this.apiService.getTotalSales();
    }catch(error){
      console.error("Order service: error while getting orders sales", error);
      throw error;       
    }
  }
}
