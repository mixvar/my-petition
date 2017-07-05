import { Observable } from 'rxjs/Observable';

import UserState from '../../model/user-state';
import Person from '../../model/person';


abstract class IUserService {

  abstract userState_: Observable<UserState>;

  abstract login(): void;

  abstract logout(): void;

  abstract getUser(): Person;
}

export default IUserService;
