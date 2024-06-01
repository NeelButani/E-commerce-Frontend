import { Component, OnInit } from '@angular/core';
import { UsersService } from './shared/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private userService : UsersService){

  }

  ngOnInit(): void {
      this.userService.initAppSession();
  }

  title = 'eshop';
}
