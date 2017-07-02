import { Expose } from 'class-transformer';


class Person {

  @Expose({ name: 'Id' })
  public id: number;

  @Expose({ name: 'FbId' })
  public fbId: number; // TODO should be string

  @Expose({ name: 'Name' })
  public name: string;
}

export default Person;
