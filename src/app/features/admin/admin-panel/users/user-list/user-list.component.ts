import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../../../../../shared/models/user';
import { UsersService } from '../../../../../shared/services/users.service';
import { countries } from 'countries-list'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{
 
  users : User[] = []

  constructor(
    private messageService : MessageService,
    private router : Router,
    private userService : UsersService,
    private confirmationService : ConfirmationService
    ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  private async getAllUsers(){
     this.users = await this.userService.getUsers();
     console.log(this.users);  
  }

 async deleteUser(userId : string){
     
      this.confirmationService.confirm({
        message : 'Do you want to Delete this user',
        header : 'Delete User',
        icon : 'pi pi-exclamation-triangle',
        accept : async () => {
            const result = await this.userService.deleteUser(userId);
            this.getAllUsers()
            if(result){
              // to add the toaster
              this.messageService.add({
                severity : 'success',
                summary : 'Success',
                detail : "User deleted."
              })   
            }else{
            this.messageService.add({
              severity : 'error',
              summary : 'Error',
              detail : "User not deleted"
            })
            console.error("User-List component : Could not delete user");
          }
        }
      })

  }
  editUser(userId : string){
    this.router.navigate([`/users/form/${userId}`])
  }


  getCountryName(countryCode){
     return countries[countryCode]?.name
  }
}
