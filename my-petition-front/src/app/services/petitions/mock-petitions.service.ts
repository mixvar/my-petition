import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/empty';
import { Http, Response } from '@angular/http';
import { plainToClass, classToPlain } from 'class-transformer';

import IPetitionsService from './petitions.service.interface';
import Petition from '../../model/petition';
import PetitionDetails from '../../model/petition-details';


@Injectable()
export class MockPetitionsService implements IPetitionsService {

  constructor(private http: Http) {
  }

  getPetitions(): Observable<Petition[]> {
    return this.http.get('assets/mocks/all-petitions.json')
      .map((response: Response) => response.json())
      .map(res => plainToClass(Petition, res as Object[]))
      .delay(1000);
  }

  getPetitionDetails(petitionId: number): Observable<PetitionDetails> {
    return this.http.get(`assets/mocks/petition-${petitionId}.json`)
      .map((response: Response) => response.json())
      .map(res => plainToClass(PetitionDetails, res as Object))
      .delay(1000);
  }

  addPetition(petition: PetitionDetails): Observable<{}> {
    console.log('sending petition:', classToPlain(petition));
    return Observable.empty()
      .delay(1000);
  }

}
