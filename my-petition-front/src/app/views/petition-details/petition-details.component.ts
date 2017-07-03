import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from '../../../../node_modules/rxjs/Subscription';

import IPetitionsService from '../../services/petitions/petitions.service.interface';
import PetitionDetails from '../../model/petition-details';


@Component({
  selector: 'app-petition-details',
  templateUrl: './petition-details.component.html',
  styleUrls: ['./petition-details.component.scss']
})
export class PetitionDetailsComponent implements OnInit, OnDestroy {

  petition: PetitionDetails;
  fetching: boolean = false;
  error: any;

  private sub: Subscription;

  constructor(private route: ActivatedRoute,
              private petitionsService: IPetitionsService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const petitionId = +params['id'];
      this.fetching = true;
      this.petitionsService.getPetitionDetails(petitionId).subscribe(
        (petition) => {
          this.petition = petition;
          this.fetching = false;
        },
        (error) => {
          this.error = error;
          this.fetching = false;
        }
      );
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
