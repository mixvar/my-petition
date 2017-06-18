import {Component, OnInit} from '@angular/core';

import IPetitionsService from '../../services/petitions/petitions.service.interface';
import Petition from '../../model/petition';


@Component({
  selector: 'app-petitions',
  templateUrl: './petitions.component.html',
  styleUrls: ['./petitions.component.scss']
})
export class PetitionsComponent implements OnInit {

  private petitions: Petition[];
  private error: any;

  constructor(private petitionService: IPetitionsService) {
  }

  ngOnInit() {
    this.petitionService.getPetitions()
      .subscribe(
        (petitions: Petition[]) => {
          this.petitions = petitions;
          console.log('petitions fetched successfully!', petitions);
        },
        (error) => {
          this.error = error;
          console.warn('error while fetching petitions!', error);
        }
      );
  }

}
