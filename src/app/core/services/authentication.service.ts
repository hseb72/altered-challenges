import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from '../models/tokens';
import { environment } from '../../../environments/environment';

import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly CURRENT_USER = 'CURRENT_USER';

  private readonly AUTH_TOKEN = 'AUTH_TOKEN';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private authUrl = environment . apiUrl + '/user' ;
  private userApiUrl = environment . apiUrl + '/user' ;
  
  private loggedUser!: string;
  localStorage!: Storage;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse('' + localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  sociallogin(data: any) {
    console.log ( data ) ;
    var socialid = data.id ;
    var id = data.id ;
    var name = data.name ;
    var email = data.email ;
    var photoUrl = data.photoUrl ;
    var authToken = data.authToken || data.idToken;
    var firstName = data.firstName ;
    var lastName = data.lastName ;
    var provider = data.provider ;

    this . storeAuthToken ( authToken ) ;
    
    return this.http.post<any>(`${this.userApiUrl}/sociallogin`, { socialid, id, name, email, firstName, lastName, provider, authToken })
      .pipe(map(User => {
        // login successful if there's a jwt token in the response
        // alert ( JSON.stringify(User));
        // if (User && User.id) {
          // alert ( JSON.stringify(User));
          // store user details and jwt token in local storage to keep user logged in between page refreshes
        // } else {
          // alert ( JSON.stringify(User));
        // }
        // alert ( JSON.stringify(User));

        // Anyway what is return, store the result.
        // If it is an empty User, it means that we're in presence of a potentially new user.
        // We should present him/her a New User Form

        localStorage.setItem('currentUser', JSON.stringify(User));
        this.currentUserSubject.next(User);

        return User;
      }));
  }  

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${this.authUrl}/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logout() {
    /* temporary usage */
    const uid = this . getCurrentUser () 
    localStorage.removeItem('currentUser');
    return this.http.post<any>(`${this.authUrl}/{uid}/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        console.log(JSON.stringify(error.error));
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${this.authUrl}/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  getCurrentUser() {
    /* temporary usage */
    return localStorage.getItem('currentUser') ;
    //return localStorage.getItem(this.CURRENT_USER);
  }

  getCurrentUserOrLeave () {
    var tmpUser = this . getCurrentUser () 
    if ( tmpUser != null ) {
      return (JSON . parse ( tmpUser ) ) ;
    } else window . location . replace ( '/' ) ;  
  }

  private doLoginUser(username: string, tokens: any) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.http.post<any>(`${environment.apiUrl}/user/logout`, {})
    .subscribe(x => this.loggedUser = x) ;
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  getAuthToken() {
    return ( localStorage.getItem(this.AUTH_TOKEN ) ) ;
  }

  private storeAuthToken( authToken: any ) {
    localStorage.setItem(this.AUTH_TOKEN, authToken);
  }

  private removeAuthToken() {
    localStorage.removeItem(this.AUTH_TOKEN);
  }

  private storeTokens(tokens: Tokens) {
    const tokenArray = tokens.jwt.split( '.' ) ;
    //const header = atob( tokenArray [0] );
    const payload = atob( tokenArray [1] );
    //const key = atob( tokenArray [2] );

    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    localStorage.setItem(this.CURRENT_USER, payload);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.CURRENT_USER);
  }

  public SocialloginService () {}
}