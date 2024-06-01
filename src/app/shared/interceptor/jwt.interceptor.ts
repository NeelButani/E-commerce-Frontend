import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStoageService } from '../services/local-stoage.service';
import { environment } from '../environment/environment';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(LocalStoageService).getItem('token');
  const isAPIUrl = req.url.startsWith(environment.apiUrl);

  if(token && isAPIUrl){
    req = req.clone({
      setHeaders : {
        Authorization : `Bearer ${token}`
      }
    })
  }
  return next(req);
};
