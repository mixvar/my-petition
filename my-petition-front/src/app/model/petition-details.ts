import Petition from './petition';
import Person from './person';

interface PetitionDetails extends Petition {
  Text: string;
  ImageUrl?: string;
  Signs: Person[];
}

export default PetitionDetails;
