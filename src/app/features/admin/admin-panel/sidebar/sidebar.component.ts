import { Component } from '@angular/core';
import { AuthenticationService } from '../../../../shared/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
 
  constructor(private authService : AuthenticationService){}

  logoutUser(){
      console.log("Logout called");
      this.authService.logout();
  }
}
