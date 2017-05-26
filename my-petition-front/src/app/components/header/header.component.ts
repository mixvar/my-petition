import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private currentStatus: string;
  private isLoggedIn: boolean;
  private userData: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.authStatus
      .subscribe(status => {
        console.log(`new status - '${status}'`);
        this.currentStatus = status;
        this.isLoggedIn = (status === 'connected');
        if (this.isLoggedIn) {
          this.userService.getUserData()
            .then(resp => {
              console.log(resp);
              this.userData = resp;
            });
        }
      });
  }

  onLogin(): void {
    this.userService.login();
  }

}
