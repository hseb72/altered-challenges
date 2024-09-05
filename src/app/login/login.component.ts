import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../core/services/authentication.service';

import { User } from '../core/models/user'
import { UserService } from '../core/services/user.service'

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:User = new User () ;
  isLoggedIn = false ;

  loading: boolean = false;
  error: string  = '' ;

  loginForm!: FormGroup;
  socialUser!: SocialUser;
  backenduser!: SocialUser; // vérifier si c'est bien nécessaire

  constructor(
    private authenticationService: AuthenticationService, 
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedIn = user != null;
      console.log(this.socialUser);
      this.localAuthent (user) ;
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(
			data => {
        this.localAuthent (data) ;
			},
			error => {
				this.error = error;
				this.loading = false;
			});
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then(
			data => {
        console.log ("FB OK") ;
        this.localAuthent (data) ;
			},
			error => {
				this.error = error;
				this.loading = false;
			});
  }

  logOut(): void {
    this.socialAuthService.signOut()
    .then(
			data => {
        this.authenticationService.logout () ;
        console.log ("disconnect") ;
			},
			error => {
				this.error = error;
				this.loading = false;
			});
  }

  localAuthent( data: any ) {    
    console.log ("Local authent ?") ;
    console.log (data) ;
        this.authenticationService.sociallogin (data)
    .subscribe(
      (user) => {
      this.backenduser = user;
      console.log ("Local authent OK") ;

      if ( user.id ) {
        window.location.replace ( '/' );
      } else {
//        this.router.navigate( [{ outlets: { primary: 'iamnew', header: null, footer: ['logged'] } }], 
//                              { queryParams: { data: JSON . stringify (data) }, skipLocationChange: true });
      }
    });
  }

  mySignin() { console.log ("j'y suis")}

}