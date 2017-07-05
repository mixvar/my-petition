import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import IUserService from '../services/user/user.service.interface';
import INotificationsService from '../services/notifications/notifications.service.interface';


@Injectable()
export class AuthGuard implements CanActivate {

  private userLoggedIn: boolean = false;

  constructor(private userService: IUserService,
              private notificationsService: INotificationsService,
              private router: Router) {
    this.userService.userState_.subscribe((state) => {
      this.userLoggedIn = state.isLoggedIn;
    });
  }

  public canActivate(): boolean {
    if (this.userLoggedIn) {
      return true;
    } else {
      this.notificationsService.error('Log in in order to create a petition!');
      this.router.navigate(['/']);
      return false;
    }
  }
}
