import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.authService.currentUser;
    if (currentUser && currentUser.jwt) {
      request = request.clone({
        setHeaders: {
          'x-access-token': `${currentUser.jwt}`
        }
      });
    }
/*
    // attach content-type if it doesn't exist
    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }
*/
    // only accept JSON
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request);
  }
}
