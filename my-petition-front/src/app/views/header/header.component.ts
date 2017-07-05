import { Component, OnInit } from '@angular/core';
import IUserService from '../../services/user/user.service.interface';
import INotificationsService from '../../services/notifications/notifications.service.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private isLoggedIn: boolean;
  private userName: string;
  private fetchingUserState: boolean;

  constructor(private userService: IUserService,
              private notificationsService: INotificationsService) {
  }

  ngOnInit() {
    this.userService.userState_
      .subscribe(userState => { // TODO clean up infinite observable

        if (!this.userName && userState.userName && userState.isLoggedIn) {
          this.onLoggedIn(userState.userName);
        }
        this.userName = userState.userName;
        this.isLoggedIn = userState.isLoggedIn;
        this.fetchingUserState = userState.fetching;
      });
  }

  login(): void {
    this.userService.login();
  }

  onLoggedIn(userName: string) {
    const name = userName.split(/(\s+)/)[0];
    this.notificationsService.info(`Logged in as ${name}!`);
  }

}
