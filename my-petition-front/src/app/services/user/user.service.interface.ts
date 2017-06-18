import {Observable} from 'rxjs/Observable';
import UserState from '../../model/user-state';


abstract class IUserService {

  abstract userState: Observable<UserState>;

  abstract login(): void;

  abstract logout(): void;
}

export default IUserService;
