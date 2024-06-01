import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user';
import { countries } from 'countries-list'
import { UsersFacade } from '../../features/auth/store/users.facade';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: ApiService , private userFacade : UsersFacade) { }

  getUsers(): Promise<User[]> {
    try {
      return this.apiService.getUsers();
    } catch (error) {
      console.error("User service: error while getting user", error);
      throw error;
    }
  }

  getUsersCount() {
    try {
      return this.apiService.getTotalUser();
    } catch (error) {
      console.error("User service: error while getting user count", error);
      throw error;
    }
  }

  createUser(user: User) {
    try {
      return this.apiService.postUser(user)
    } catch (error) {
      console.error("User service: error while creating User", error);
      throw error;
    }

  }

  deleteUser(userId: any) {
    try {
      return this.apiService.deleteUser(userId)
    } catch (error) {
      console.error("User service: error while deleting user", error);
      throw error;
    }
  }

  getUser(userId: any) {
    try {
      return this.apiService.getUser(userId)
    } catch (error) {
      console.error("User service: error while fetching user", error);
      throw error;
    }
  }


  updateUser(userId: any, user: User) {
    try {
      return this.apiService.updateUser(userId, user)
    } catch (error) {
      console.error("User service: error while updating user", error);
      throw error;
    }

  }

  getCountries() {
    return Object.keys(countries).map((code) => {
      let obj = {
        id: code,
        name: countries[code].name
      }
      return obj
    }) 
  }

  initAppSession(){
    this.userFacade.buildUserSess()
  }

  observeCurrentUser(){
    return this.userFacade.currentUser$;
  }

  isCurrentUserAuthenticated(){
    return this.userFacade.isAuthenticated$;
  }

}

