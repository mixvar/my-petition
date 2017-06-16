import Person from './Person';

interface Petition {
  Id: number;
  Title: string;
  CreationDate: any;
  SignCount: number;
  Tags: string[];
  Owner: Person;
}

export default Petition;
