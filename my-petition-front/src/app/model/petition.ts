import { Expose, Type } from 'class-transformer';
import Person from './Person';


class Petition {

  @Expose({ name: 'Id' })
  public id: number;

  @Expose({ name: 'Title' })
  public title: string;

  @Expose({ name: 'CreationDate' })
  @Type(() => Date)
  public creationDate: Date;

  @Expose({ name: 'SignCount' })
  public signCount: number;

  @Expose({ name: 'Tags' })
  public tags: string[];

  @Expose({ name: 'Owner' })
  @Type(() => Person)
  public owner: Person;


  public getFormattedTags(): string {
    return this.tags.reduce((acc, tag, i) => (
      (i) ? `${acc}, ${tag}` : tag
    ), '');
  }

  public getFormattedSignsCount(): string {
    switch (this.signCount) {
      case 0:
        return 'no signs';
      case 1:
        return '1 sign';
      default:
        return `${this.signCount} signs`;
    }
  }
}

export default Petition;
