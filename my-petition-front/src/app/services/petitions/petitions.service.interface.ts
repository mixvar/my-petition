import { Observable } from 'rxjs/Observable';
import Petition from '../../model/petition';
import PetitionDetails from '../../model/petition-details';


abstract class IPetitionsService {

  abstract getPetitions(): Observable<Petition[]>;

  abstract getPetitionDetails(petitionId: number): Observable<PetitionDetails>;

  abstract addPetition(petition: PetitionDetails): Observable<{}>;
}

export default IPetitionsService;
