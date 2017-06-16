import {Component, OnInit} from '@angular/core';
import IUserService from '../../services/user/user.service.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private isLoggedIn: boolean;
  private userName: string;
  private fetchingUserState: boolean;

  constructor(private userService: IUserService) {
  }

  ngOnInit() {
    this.userService.userState.subscribe(userState => { // TODO clean up infinite observable
      this.isLoggedIn = userState.isLoggedIn;
      this.userName = userState.userName;
      this.fetchingUserState = userState.fetching;
    });
  }

  onLogin(): void {
    this.userService.login();
  }

}
