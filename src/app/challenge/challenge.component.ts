import { Component, OnInit } from '@angular/core';

import { User } from '../core/models/user'
import { UserService } from '../core/services/user.service'

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {
  user:User = new User () ;
  isLoggedIn = false ;

  constructor() { }

  ngOnInit(): void {
  }

}
