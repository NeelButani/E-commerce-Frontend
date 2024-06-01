import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {

  if(inject(AuthenticationService).isUserAuthorized()){
    return true
  } else {
     inject(Router).navigateByUrl('login')
     return false;
  }
};
