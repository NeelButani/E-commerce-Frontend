import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoageService {

  constructor() { }

  setItem(key,data){
    localStorage.setItem(key,data)
  }

  getItem(key): string {
    return localStorage.getItem(key)
  }

  removeItem(key) {
    localStorage.removeItem(key)
  }

  isValidToken(){
    const token = this.getItem('token');
    if(token){
      const tokenDecod = JSON.parse(atob(token.split('.')[1]));
      return !this.istokenExpired(tokenDecod.exp)
    }
    return false
  }
  istokenExpired(expiration){
    return Math.floor(new Date().getTime() / 1000) >= expiration
  }

  getUserIdfromToken(){
    const token = this.getItem('token');
    if(token){
      const tokenDecod = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecod){
        console.log("neel",tokenDecod.userId);
        return tokenDecod.userId
      } else {
        return null
      }
    }
    return null
  }
}
