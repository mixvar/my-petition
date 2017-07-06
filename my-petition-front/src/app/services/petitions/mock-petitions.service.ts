import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { Http, Response } from '@angular/http';
import { plainToClass, classToPlain } from 'class-transformer';

import IPetitionsService from './petitions.service.interface';
import Petition from '../../model/petition';
import PetitionDetails from '../../model/petition-details';
import NewPetitionResponse from '../../model/response/new-petition-response';


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

  addPetition(petition: PetitionDetails): Observable<NewPetitionResponse> {
    console.log('sending petition:', classToPlain(petition));
    return this.http.get(`assets/mocks/new-petition-response.json`)
      .map((response: Response) => response.json())
      .map(res => plainToClass(NewPetitionResponse, res as Object))
      .delay(1000);
  }

  signPetition(petitionId: number): Observable<any> {
    console.log(`signing petition #${petitionId}`);
    return Observable.of('signed!').delay(1000);
  }

}
