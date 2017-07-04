import { Expose, Type } from 'class-transformer';


class NewPetition {

  @Expose({ name: 'Title' })
  public title: string;

  @Expose({ name: 'Description' })
  public description: string;

  @Expose({ name: 'Addressee' })
  public addressee: string;

  @Expose({ name: 'CreationDate' })
  @Type(() => Date)
  public creationDate: Date;

  @Expose({ name: 'Tags' })
  public tags: string[];

  @Expose({ name: 'Text' })
  public text: string;

  @Expose({ name: 'ImageBase64' })
  public imageBase64?: string;

}

export default NewPetition;
