import { Component, OnInit, Input } from '@angular/core';
import { User } from '../core/models/user'
import { UserService } from '../core/services/user.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  @Input() isLoggedIn: boolean = false;
  @Input() givenCode: string = '';
  @Input() user: User = new User ();

  constructor() { }

  ngOnInit(): void {
  }

}
