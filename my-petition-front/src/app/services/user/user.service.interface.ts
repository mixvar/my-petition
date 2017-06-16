import UserState from '../../model/user-state';
import {Observable} from '../../../../node_modules/rxjs/Observable';

abstract class IUserService {

  abstract userState: Observable<UserState>;
  abstract login(): void;
  abstract logout(): void;
}

export default IUserService;
