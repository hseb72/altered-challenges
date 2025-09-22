import { Component, OnInit, Input } from '@angular/core';
import { User } from '../core/models/user'
import { UserService } from '../core/services/user.service'

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})

export class FooterComponent implements OnInit {
  @Input() user: User = new User (); ;
  @Input() isLoggedIn: boolean = false;

  constructor() { }
 
  ngOnInit(): void {
  }

}
