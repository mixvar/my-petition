import {Injectable} from '@angular/core';
import {FacebookService, InitParams, LoginResponse} from 'ngx-facebook';
import {ReplaySubject} from 'rxjs';
import UserState from './user-state';


const initParams: InitParams = {
  appId: '125654228008369',
  xfbml: true,
  version: 'v2.9',
};

@Injectable()
export class UserService {

  // public userStateObservable: ReplaySubject<UserState> = new ReplaySubject(1);
  // public currentUserState: UserState = {
  //   status: 'unknown',
  //   isLoggedIn: false,
  //   accessToken: null,
  //   userId: null,
  //   userName: null,
  // };

  public authStatus: ReplaySubject<string> = new ReplaySubject(1);
  public isLoggedIn = false;

  constructor(private facebookService: FacebookService) {
    this.initFb();
    this.updateStatus();
    this.authStatus.subscribe(status =>
      this.isLoggedIn = (status === 'connected'));
  }

  private initFb(): void {
    this.facebookService.init(initParams)
      .then((response: LoginResponse) => console.log('initFb', response))
      .catch((error: any) => console.error('initFb error!', error));
  }

  public updateStatus(): void {
    this.facebookService.getLoginStatus()
      .then((response: LoginResponse) => {
        console.log('updateStatus', response);
        const currentStatus = (response && response.status)
          ? response.status
          : 'unknown';
        this.authStatus.next(currentStatus);
      })
      .catch((error: any) => {
        console.error('updateStatus error!', error);
        this.authStatus.next('unknown');
      });
  }


  public login(): void {
    this.facebookService.login()
      .then((response: LoginResponse) => {
        console.log('login', response);
        if (response && response.status) {
          this.authStatus.next(response.status);
        } else {
          this.updateStatus();
        }
      })
      .catch((error: any) => {
        console.error('login error!', error);
        this.updateStatus();
      });
  }

  public getUserData(): Promise<any> {
    if (!this.isLoggedIn) {
      throw new Error('unauthorized!');
    }

    return this.facebookService.api('/me');
  };

}
