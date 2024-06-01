import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '../environment/environment';
import { Product } from '../models/product';
import { User } from '../models/user';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // ---------------------------------------------------------------------------
  //                API FOR CATEGORY
  // ---------------------------------------------------------------------------


  // to get category list
  async getCategories(): Promise<Category[]> {
    try {
      const categories: Category[] = await lastValueFrom(this.http.get<Category[]>(`${environment.apiUrl}/categories`))
      return categories;
    } catch (error) {
      console.error("Api service : error while fetching the categories", JSON.stringify(error));
      return Promise.reject(error)
    }
  }

  // to post category
  async postCategory(category: Category) {
    try {
      const result = await lastValueFrom(this.http.post(`${environment.apiUrl}/categories`, category));
      return result;
    } catch (error) {
      console.error("Api service : error while posting the categories", JSON.stringify(error));
      return Promise.reject(error)
    }
  }

  // to delete category
  async deleteCategory(categoryId: any) {
    try {
      const result = await lastValueFrom(this.http.delete(`${environment.apiUrl}/categories/${categoryId}`));
      return result;
    } catch (error) {
      console.error("Api service : error while deleting the categories", JSON.stringify(error));
      return Promise.reject(error)
    }
  }

  // to get particular category
  async getCategory(categoryId: any): Promise<Category> {
    try {
      const category: Category = await lastValueFrom(this.http.get<Category>(`${environment.apiUrl}/categories/${categoryId}`))
      return category;
    } catch (error) {
      console.error("Api service : error while fetching the category", JSON.stringify(error));
      return Promise.reject(error)
    }
  }

  //  to update category  
  async updateCategory(categoryId: any, category: Category) {
    try {
      const result = await lastValueFrom(this.http.put(`${environment.apiUrl}/categories/${categoryId}`, category));
      return result;
    } catch (error) {
      console.error("Api service : error while posting the categories", JSON.stringify(error));
      return Promise.reject(error)
    }
  }

  // ---------------------------------------------------------------------------
  //                API FOR PRODUCTS
  // ---------------------------------------------------------------------------

  // to get ProductList
  async getProducts(categoriesFilter : String[]): Promise<Product[]> {
    try {
      let params = new HttpParams();
      if(categoriesFilter){
        params = params.append('categories', categoriesFilter.join(','))
      }
      const products: Product[] = await lastValueFrom(this.http.get<Product[]>(`${environment.apiUrl}/products`, {params : params}))
      return products;
    } catch (error) {
      console.error("Api service : error while fetching the products", JSON.stringify(error));
      return Promise.reject(error)
    }
  }

  async addProduct(product: FormData) {
    try {
      const result = await lastValueFrom(this.http.post(`${environment.apiUrl}/products`, product));
      return result;
    } catch (error) {

      console.error("Api service : error while posting the product", JSON.stringify(error));
      return Promise.reject(error)
    }
  }

  // to get particular category
  async getProduct(productId: any): Promise<Product> {
    try {
      const product: Product = await lastValueFrom(this.http.get<Product>(`${environment.apiUrl}/products/${productId}`))
      return product;
    } catch (error) {
      console.error("Api service : error while fetching the product", JSON.stringify(error));
      return Promise.reject(error)
    }
  }


  //  to update category  
  async updateProduct(productId: any, productFormData: FormData) {
    try {
      const result = await lastValueFrom(this.http.put(`${environment.apiUrl}/products/${productId}`, productFormData));
      return result;
    } catch (error) {
      console.error("Api service : error while updating the product", JSON.stringify(error));
      return Promise.reject(error)
    }
  }


  // to delete category
  async deleteProduct(productId: any) {
    try {
      const result = await lastValueFrom(this.http.delete(`${environment.apiUrl}/products/${productId}`));
      return result;
    } catch (error) {
      console.error("Api service : error while deleting the products", JSON.stringify(error));
      return Promise.reject(error)
    }
  }


  // ---------------------------------------------------------------------------
  //                API FOR Users
  // ---------------------------------------------------------------------------

  // to get userList
  async getUsers(): Promise<User[]> {
    try {
      const users: User[] = await lastValueFrom(this.http.get<User[]>(`${environment.apiUrl}/users`))
      return users;
    } catch (error) {
      console.error("Api service : error while fetching the Users", JSON.stringify(error));
      return Promise.reject(error)
    }
  }

  // to delete user
  async deleteUser(userId: any) {
    try {
      const result = await lastValueFrom(this.http.delete(`${environment.apiUrl}/users/${userId}`));
      return result;
    } catch (error) {
      console.error("Api service : error while deleting the users", JSON.stringify(error));
      return Promise.reject(error)
    }
  }

  // to post user
  async postUser(user: User) {
    try {
      const result = await lastValueFrom(this.http.post(`${environment.apiUrl}/users`, user));
      return result;
    } catch (error) {
      console.error("Api service : error while posting the user", JSON.stringify(error));
      return Promise.reject(error)
    }
  }

  // to get particular user
  async getUser(userId: any): Promise<User> {
    try {
      const user: User = await lastValueFrom(this.http.get<User>(`${environment.apiUrl}/users/${userId}`))
      return user;
    } catch (error) {
      console.error("Api service : error while fetching the user", JSON.stringify(error));
      return Promise.reject(error)
    }
  }

  //  to update category  
  async updateUser(userId: any, user: User) {
    try {
      const result = await lastValueFrom(this.http.put(`${environment.apiUrl}/users/${userId}`, user));
      return result;
    } catch (error) {
      console.error("Api service : error while updating the user", JSON.stringify(error));
      return Promise.reject(error)
    }
  }

  // ---------------------------------------------------------------------------
  //                API FOR Order
  // ---------------------------------------------------------------------------


  // to get order list
  async getOrders(): Promise<Order[]> {
    try {
      const orders: Order[] = await lastValueFrom(this.http.get<Order[]>(`${environment.apiUrl}/orders`))
      return orders;
    } catch (error) {
      console.error("Api service : error while fetching the orders", JSON.stringify(error));
      return Promise.reject(error)
    }
  }

  // to post order
  async postOrder(order: Order) {
    try {
      const result = await lastValueFrom(this.http.post(`${environment.apiUrl}/orders`, order));
      return result;
    } catch (error) {
      console.error("Api service : error while posting the orders", JSON.stringify(error));
      return Promise.reject(error)
    }
  }

  // to delete order
  async deleteOrder(orderId: any) {
    try {
      const result = await lastValueFrom(this.http.delete(`${environment.apiUrl}/orders/${orderId}`));
      return result;
    } catch (error) {
      console.error("Api service : error while deleting the order", JSON.stringify(error));
      return Promise.reject(error)
    }
  }

  // to get particular order
  async getOrder(orderId: any): Promise<Order> {
    try {
      const order: Order = await lastValueFrom(this.http.get<Order>(`${environment.apiUrl}/orders/${orderId}`))
      return order;
    } catch (error) {
      console.error("Api service : error while fetching the order", JSON.stringify(error));
      return Promise.reject(error)
    }
  }

  async updateOrderStatus(orderStatus , orderId) {
    try {
      const result = await lastValueFrom(this.http.put(`${environment.apiUrl}/orders/${orderId}`, orderStatus));
      return result;
    } catch (error) {
      console.error("Api service : error while updatying  the status of orders", JSON.stringify(error));
      return Promise.reject(error)
    }
  }


  // authentication

  async login(userCredentials){
    try {
      const result = await lastValueFrom(this.http.post(`${environment.apiUrl}/users/login`, userCredentials));
      return result;
    } catch (error) {
      console.error("Api service : error while login", JSON.stringify(error));
      return Promise.reject(error)
    }  
  }

  // get total orders
  async getOrderCount(){
    try {
      const result = this.http.get(`${environment.apiUrl}/orders/get/count`)
      return result;
    } catch (error) {
      console.error("Api service : error while getting order count", JSON.stringify(error));
      return Promise.reject(error)
    }    
  }

  // get total products
  async getProductCount(){
    try {
      const result = this.http.get(`${environment.apiUrl}/products/get/count`)
      return result;
    } catch (error) {
      console.error("Api service : error while getting product count", JSON.stringify(error));
      return Promise.reject(error)
    }    
  }

  // get total users
  async getTotalUser(){
    try {
      const result = this.http.get(`${environment.apiUrl}/users/get/count`);
      return result;
    } catch (error) {
      console.error("Api service : error while getting product count", JSON.stringify(error));
      return Promise.reject(error)
    }    
  }

  // get total users
  async getTotalSales(){
    try {
      const result = this.http.get(`${environment.apiUrl}/orders/get/totalSales`)
      return result;
    } catch (error) {
      console.error("Api service : error while getting total sales", JSON.stringify(error));
      return Promise.reject(error)
    }    
  }


  // to get featured products
  async getFeaturedProducts(count): Promise<Product[]> {
    try {
      const products: Product[] = await lastValueFrom(this.http.get<Product[]>(`${environment.apiUrl}/products/get/featured/${count}`))
      return products;
    } catch (error) {
      console.error("Api service : error while fetching the featured products", JSON.stringify(error));
      return Promise.reject(error)
    }
  }
  
}
