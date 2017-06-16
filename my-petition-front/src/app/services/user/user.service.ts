import {Injectable} from '@angular/core';
import {FacebookService, InitParams, LoginResponse} from 'ngx-facebook';
import {ReplaySubject} from 'rxjs/ReplaySubject';

import UserState from '../../model/user-state';
import IUserService from './user.service.interface';
import {AuthResponse} from '../../../../node_modules/ngx-facebook/dist/esm/models/auth-response';


const initParams: InitParams = {
  appId: '125654228008369',
  xfbml: true,
  version: 'v2.9',
};

const initialUserState: UserState = {
  status: 'unknown',
  isLoggedIn: false,
  fetching: false,
};

@Injectable()
export class UserService extends IUserService {

  public userState: ReplaySubject<UserState> = new ReplaySubject(1);
  private currentUserState: UserState;

  constructor(private facebookService: FacebookService) {
    super();
    this.userState.next(initialUserState);
    this.userState.subscribe(newState => {
      console.log('new userState: ', newState);
      this.currentUserState = newState;
    });
    this.initFb();
  }

  public login(): void {
    this.facebookService.login()
      .then((response: LoginResponse) => {
        console.log('login', response);
        if (!response || !response.status || !response.authResponse) {
          throw new Error('invalid response');
        }
        this.handleStatusChange(response.status, response.authResponse);
      })
      .catch((error: any) => {
        console.error('login error!', error);
        this.handleStatusChange('unknown');
      });
  }


  logout(): void {
    console.warn('logout not implemented!');
    // TODO
  }

  private initFb(): void {
    this.facebookService.init(initParams)
      .then((response: LoginResponse) => {
        console.log('initFb', response);
        this.updateStatus();
      })
      .catch((error: any) => console.error('initFb error!', error));
  }

  private updateStatus(): void {
    this.userState.next({...this.currentUserState, fetching: true});

    this.facebookService.getLoginStatus()
      .then((response: LoginResponse) => {
        console.log('updateStatus', response);
        if (!response || !response.status || !response.authResponse) {
          throw new Error('response missing status');
        }
        this.handleStatusChange(response.status, response.authResponse);
      })
      .catch((error: any) => {
        console.error('updateStatus error!', error);
        this.handleStatusChange('unknown');
      });
  }

  private handleStatusChange(status: string, auth: AuthResponse = null): void {
    if (status === 'connected') {
      const state: UserState = {
        status,
        isLoggedIn: true,
        userId: auth.userID,
        accessToken: auth.accessToken,
        fetching: true,
      };
      this.userState.next(state);
      this.getUserData();
    } else {
      this.userState.next({
        status,
        isLoggedIn: false,
        fetching: false,
      });
    }
  }

  private getUserData(): void {
    this.facebookService.api('/me')
      .then(userData => {
        console.log('userData fetched successfully!', userData);
        this.userState.next({
          ...this.currentUserState,
          userName: userData.name,
          fetching: false,
        });
      })
      .catch(error => {
        console.warn('error while fetching user data!', error);
        this.updateStatus();
      });
  };

}
