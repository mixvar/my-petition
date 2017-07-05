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


  public initializeNewPetition(user: Person) {
    this.creationDate = new Date().getTime();
    this.owner = user;
    this.signCount = 1;
    this.signs = new Array(user);
  }
}

export default PetitionDetails;
