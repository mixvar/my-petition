import { Expose } from 'class-transformer';

class NewPetitionResponse {

  @Expose({ name: 'PetitionId' })
  public petitionId: number;

}

export default NewPetitionResponse;
