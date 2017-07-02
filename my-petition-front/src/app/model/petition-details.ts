import { Expose, Type } from 'class-transformer';
import Petition from './petition';
import Person from './person';


class PetitionDetails extends Petition {

  @Expose({ name: 'Text' })
  public text: string;

  @Expose({ name: 'ImageUrl' })
  public imageUrl?: string;

  @Expose({ name: 'Signs' })
  @Type(() => Person)
  public signs: Person[];
}

export default PetitionDetails;
