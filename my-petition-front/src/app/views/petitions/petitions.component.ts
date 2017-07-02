import { Component, OnInit } from '@angular/core';

import IPetitionsService from '../../services/petitions/petitions.service.interface';
import Petition from '../../model/petition';


@Component({
  selector: 'app-petitions',
  templateUrl: './petitions.component.html',
  styleUrls: ['./petitions.component.scss']
})
export class PetitionsComponent implements OnInit {

  petitions: Petition[];
  error: any;
  fetching = false;

  constructor(private petitionService: IPetitionsService) {
  }

  ngOnInit() {
    this.fetching = true;
    this.petitionService.getPetitions()
      .subscribe(
        (petitions: Petition[]) => {
          this.petitions = petitions;
          console.log('petitions fetched successfully!', petitions);
          this.fetching = false;
        },
        (error) => {
          this.error = error;
          console.warn('error while fetching petitions!', error);
          this.fetching = false;
        }
      );
  }

}
