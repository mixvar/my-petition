import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import IPetitionsService from './petitions.service.interface';
import Petition from '../../model/petition';
import PetitionDetails from '../../model/petition-details';
import NewPetitionResponse from '../../model/response/new-petition-response';


@Injectable()
export class PetitionsService implements IPetitionsService {

  constructor() {
  }

  getPetitions(): Observable<Petition[]> {
    throw new Error('getPetitions not implemented!');
  }

  getPetitionDetails(petitionId: number): Observable<PetitionDetails> {
    throw new Error('getPetitionDetails not implemented!');
  }

  addPetition(petition: PetitionDetails): Observable<NewPetitionResponse> {
    throw new Error('addPetition not implemented!');
  }

  signPetition(petitionId: number): Observable<{}> {
    throw new Error('signPetition not implemented.');
  }

}
