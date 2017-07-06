import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/empty';
import { plainToClass, classToPlain } from 'class-transformer';

import IPetitionsService from './petitions.service.interface';
import Petition from '../../model/petition';
import PetitionDetails from '../../model/petition-details';
import NewPetitionResponse from '../../model/response/new-petition-response';
import IUserService from '../user/user.service.interface';


// const apiUrl = 'http://localhost:8733/Design_Time_Addresses/Service1';
const apiUrl = '/api';

@Injectable()
export class PetitionsService implements IPetitionsService {

  constructor(private http: Http,
              private userService: IUserService) { }

  getPetitions(): Observable<Petition[]> {
    return this.http.get(apiUrl + '/petitions')
      .map(res => res.json())
      .map(res => plainToClass(Petition, res as Object[]));
  }

  getPetitionDetails(petitionId: number): Observable<PetitionDetails> {
    return this.http.get(apiUrl + `/petition/${petitionId}`)
      .map(res => res.json())
      .map(res => plainToClass(PetitionDetails, res as Object));
  }

  addPetition(petition: PetitionDetails): Observable<NewPetitionResponse> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(apiUrl + '/petitions', classToPlain(petition), { headers: headers })
      .map(res => res.json())
      .map(res => plainToClass(NewPetitionResponse, res as Object));
  }

  signPetition(petitionId: number): Observable<any> {
    const user = this.userService.getUser();
    if (!user) {
      throw new Error('user not logged in!');
    }

    return this.http.post(apiUrl + `/petitions/${petitionId}/sign/${user.fbId}`, {})
      .map(res => res.json());
  }

}
