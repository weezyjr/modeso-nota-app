import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { NotifierService } from 'angular-notifier';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private notifierService: NotifierService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(serverError => {

      let error = 'Something went wrong !';

      if (serverError) {
        if (serverError.status === 401) {
          // auto logout if 401 response returned from api
          this.authService.logout();
        }

        if (serverError.status === 404) {
          // TODO: handle api 404 errors
        }

        // return the error message or the statusText
        if (serverError.error || serverError.statusText) {
          error = serverError.error.message || serverError.statusText;
          this.notifierService.notify('error', error);
        }
      }
      return throwError(error);
    }));
  }
}
