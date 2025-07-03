import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // console.log('Hello Interceptor')
    let token = localStorage.getItem('userToken');
    if (token) {
      let requestClone = request.clone({
        headers: request.headers.append('token', token),
      });
      return next.handle(requestClone);
    }
    // console.log(request);
    return next.handle(request);
  }
}
