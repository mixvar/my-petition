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


  public static newPetition(user: Person,
                            title: string,
                            description: string,
                            addressee: string,
                            tags: Array<string>,
                            serializedText: string): PetitionDetails {
    const petition = new PetitionDetails();

    petition.creationDate = new Date().getTime();
    petition.owner = user;
    petition.signCount = 1;
    petition.signs = new Array(user);
    petition.title = title;
    petition.description = description;
    petition.addressee = addressee;
    petition.tags = tags;
    petition.text = serializedText;
    return petition;
  }

}

export default PetitionDetails;
