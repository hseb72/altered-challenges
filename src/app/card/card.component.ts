import { Component } from '@angular/core';

import { User } from '../core/models/user'
import { UserService } from '../core/services/user.service'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false
})
export class CardComponent {
  user:User = new User () ;
  isLoggedIn = false ;

  constructor() { }

  ngOnInit(): void {
  }

}
