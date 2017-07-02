import { Expose, Type } from 'class-transformer';
import Petition from './petition';
import Person from './person';


class PetitionDetails extends Petition {

  @Expose({ name: 'Description' })
  public description: string;

  @Expose({ name: 'Text' })
  public text: string;

  @Expose({ name: 'ImageBase64' })
  public imageBase64?: string;

  @Expose({ name: 'Signs' })
  @Type(() => Person)
  public signs: Person[];
}

export default PetitionDetails;
