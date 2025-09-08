import { Component } from '@angular/core';

import { User } from '../core/models/user'
import { UserService } from '../core/services/user.service'

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrl: './news.component.scss',
    standalone: false
})
export class NewsComponent {
  user:User = new User () ;
  isLoggedIn = false ;
}
