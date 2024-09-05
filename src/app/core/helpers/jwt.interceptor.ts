import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //console.log ( "Intercepted") ;
    // if (this.authenticationService.getJwtToken()) {
    //   request = this.addToken(request, this.authenticationService.getJwtToken());
    // }

    if (this . authenticationService . getAuthToken ()) {
      // console.log ( "Got Token") ;
      request = this . addToken ( request, "" + this . authenticationService . getAuthToken () ) ;
    }
    // console.log ( request ) ;

    return next.handle(request)
    .pipe(catchError(error => {
      // console.error ( "Error is : " + error ) ;
      // alert('Please stop becuase of ' + JSON.stringify(error.error) )

      if (error instanceof HttpErrorResponse && error.status === 401) {
        console.log ( "Received 401") ;
        // alert('Received 401')
        //return (error) ;
        return this.handle401Error(request, next);
      } else {
        // alert(JSON.stringify(request));
        //alert(JSON.stringify(next));
        // alert(JSON.stringify(error));
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    // console.log ( "Add Token") ;
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      console.log ( "401's 1st deny") ;
      // alert ( "401's 1st deny" );
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authenticationService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.addToken(request, token.jwt));
        }));

    } else {
      console.log ( "401's 2nd deny") ;
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}