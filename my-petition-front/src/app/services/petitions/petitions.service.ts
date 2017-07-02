import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import IPetitionsService from './petitions.service.interface';
import Petition from '../../model/petition';
import PetitionDetails from '../../model/petition-details';


@Injectable()
export class PetitionsService implements IPetitionsService {

  constructor() {
  }

  getPetitions(): Observable<Petition[]> {
    // TODO
    return undefined;
  }

  getPetitionDetails(petitionId: number): Observable<PetitionDetails> {
    // TODO
    return undefined;
  }

}
