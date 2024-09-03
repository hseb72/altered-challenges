import { Component, OnInit } from '@angular/core';

import { User } from '../core/models/user'
import { UserService } from '../core/services/user.service'

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  user:User = new User () ;
  isLoggedIn = false ;

  constructor() { }

  ngOnInit(): void {
  }

}
