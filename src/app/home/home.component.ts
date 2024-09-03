import { Component, OnInit } from '@angular/core';

import { User } from '../core/models/user'
import { UserService } from '../core/services/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user:User = new User () ;
  isLoggedIn = false ;

  constructor() { }

  ngOnInit(): void {
  }

}
