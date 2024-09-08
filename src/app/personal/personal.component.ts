import { Component, OnInit } from '@angular/core';

import { User } from '../core/models/user'
import { UserService } from '../core/services/user.service'

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit {
  user: User = new User () ;
  isLoggedIn = false ;

  constructor() { }

  ngOnInit(): void {
  }
}