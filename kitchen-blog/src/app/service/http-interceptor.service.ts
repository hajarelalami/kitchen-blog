import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {


  constructor(public auth: UserService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getTocken()}`
        }
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404 || error.status === 401) {
          this.auth.clearToken();
          this.router.navigate(['/login'])
        }
        return throwError(error);
      }));
  }
}
