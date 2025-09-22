import { Component } from '@angular/core';
import { User } from './core/models/user'

import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'altered-challenges';

  isLoggedIn: boolean = false;
  user: User = new User (); ;
  queryParams: any;

  constructor(
    private authService: AuthenticationService, 
    private route: ActivatedRoute) {
      var tmpSower = this . authService . getCurrentUser () 
      if ( tmpSower != null ) {
        this . user = JSON . parse ( tmpSower ) ;
        this . isLoggedIn = true ;
      } else this . user . id = 0 ;
  }
}

