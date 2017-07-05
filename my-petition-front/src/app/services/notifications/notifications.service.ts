import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import INotificationsService from './notifications.service.interface';


@Injectable()
export class NotificationsService implements INotificationsService {

  private defaultDuration: number = 4000;

  constructor(private snackBar: MdSnackBar) { }

  success(message: string, duration: number = this.defaultDuration) {
    this.snackBar.open(message, null, {
      duration,
      extraClasses: ['snack-success', 'snack-no-action'],
    });
  }

  info(message: string, duration: number = this.defaultDuration) {
    this.snackBar.open(message, null, {
      duration,
      extraClasses: ['snack-info', 'snack-no-action'],
    });
  }

  error(message: string, duration: number = this.defaultDuration) {
    this.snackBar.open(message, null, {
      duration,
      extraClasses: ['snack-error', 'snack-no-action'],
    });
  }

}
