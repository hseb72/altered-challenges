import { Component } from '@angular/core';
import { Alter } from './core/models/alter'

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

  isLoggedin: boolean = false;
  user: Alter = new Alter (); ;
  queryParams: any;
}
