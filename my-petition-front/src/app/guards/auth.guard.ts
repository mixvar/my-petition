import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import IUserService from '../services/user/user.service.interface';


@Injectable()
export class AuthGuard implements CanActivate {

  private userLoggedIn: boolean = false;

  constructor(private userService: IUserService,
              private snackbar: MdSnackBar) {
    this.userService.userState_.subscribe((state) => {
      this.userLoggedIn = state.isLoggedIn;
    });
  }

  public canActivate(): boolean {
    if (this.userLoggedIn) {
      return true;
    } else {
      this.snackbar.open('Log in in order to create a petition!', 'LOGIN', {
        duration: 4000,
        extraClasses: ['snack-err', 'snack-no-action'],
      });
    }
  }

}
