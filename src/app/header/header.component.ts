import { Component, OnInit, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button' ;
import { MatIconModule } from '@angular/material/icon' ;
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { User } from '../core/models/user'

const uiModules = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatTableModule,
  MatToolbarModule
];

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn: boolean = false;
  @Input() user: User = new User ();

  /*
  ** Things to make in start now
  ** To delete or adapt later
  */

  public isMenuOpen = false;

  andMore () {
    this . isMenuOpen = ! this . isMenuOpen ;
    //this . sidenav 
  }
    /*
  ** Real things start here
  */

  constructor() { }

  ngOnInit(): void {
  }

}
