import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LocalStoageService } from './local-stoage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private apiService : ApiService , private localStorageService : LocalStoageService,
    private router : Router
  ) { }

  login(userCredentials){
    try{
      return this.apiService.login(userCredentials)
    } catch(error){
      console.log("authentication Service",error);
      throw error
    }
  }

  isUserAuthorized(){
     const token = this.localStorageService.getItem('token');
     if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecode.isAdmin && !this.istokenExpired(tokenDecode.exp)) {
        return true
      }
     }
     return false
  }

  istokenExpired(expiration){
    return Math.floor(new Date().getTime() / 1000) >= expiration
  }

  logout(){
    this.localStorageService.removeItem('token');
    this.router.navigate(['/login']);
  }
}
