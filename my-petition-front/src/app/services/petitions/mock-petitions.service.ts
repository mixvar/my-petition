import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import { Http, Response } from '@angular/http';
import { plainToClass } from 'class-transformer';

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
      .delay(1500);
  }

  getPetitionDetails(petitionId: number): Observable<PetitionDetails> {
    // TODO
    return undefined;
  }

}
