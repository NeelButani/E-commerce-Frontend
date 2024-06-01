import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { LocalStoageService } from '../../../shared/services/local-stoage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  loginError : string;
  authError = false;
 
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
    private localStorageService: LocalStoageService,
    private router : Router
  ) { }

  ngOnInit(): void {
      this.initializeLoginForm();
  }

  private initializeLoginForm(){
    this.loginForm = this.formBuilder.group({
      email : ['',[Validators.required , Validators.email]],
      password : ['', Validators.required]
    })
  }
   
  get getloginForm(){
    return this.loginForm.controls;
  }

  async onSubmit(){
    try{
      if(this.loginForm.valid){
        this.authError = false;
        const loginData = {
          email : this.getloginForm.email.value,
          password : this.getloginForm.password.value
        }
        const result : any = await this.authenticationService.login(loginData);
        console.log("After login -> result data",result);
        if(result){
          this.localStorageService.setItem('token',result.token)
        }
        this.router.navigateByUrl('/');
      }
    } catch(error){
      console.log(error);
      this.authError = true
      if(error.status === 400){
        this.loginError = "Invalid Credentials"
      } else {
        this.loginError = "Something went Wrong"
      }
    }
  }
}
