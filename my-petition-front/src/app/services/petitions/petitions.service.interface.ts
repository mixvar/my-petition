import { Observable } from 'rxjs/Observable';
import Petition from '../../model/petition';
import PetitionDetails from '../../model/petition-details';
import NewPetitionResponse from '../../model/response/new-petition-response';


abstract class IPetitionsService {

  abstract getPetitions(): Observable<Petition[]>;

  abstract getPetitionDetails(petitionId: number): Observable<PetitionDetails>;

  abstract addPetition(petition: PetitionDetails): Observable<NewPetitionResponse>;
}

export default IPetitionsService;
