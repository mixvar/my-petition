import {Component, Input} from '@angular/core';
import Petition from '../../../model/petition';

@Component({
  selector: 'app-petition-tile',
  templateUrl: './petition-tile.component.html',
  styleUrls: ['./petition-tile.component.scss']
})
export class PetitionTileComponent {

  @Input()
  private petition: Petition;

  constructor() {
  }

}
