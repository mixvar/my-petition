import { Expose } from 'class-transformer';


class Person {

  @Expose({ name: 'Id' })
  public id: number;

  @Expose({ name: 'FbId' })
  public fbId: string;

  @Expose({ name: 'Name' })
  public name: string;
}

export default Person;
