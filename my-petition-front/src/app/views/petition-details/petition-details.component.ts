import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from '../../../../node_modules/rxjs/Subscription';

import IPetitionsService from '../../services/petitions/petitions.service.interface';
import PetitionDetails from '../../model/petition-details';
import IMarkdownService from '../../services/markdown/markdown.service.interface';
import IUserService from '../../services/user/user.service.interface';


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
              private petitionsService: IPetitionsService,
              private markdownService: IMarkdownService,
              private userService: IUserService) { }

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

  getParsedText(): string {
    return this.markdownService.parse(this.petition.text);
  }

  isSigned(): boolean {
    const user = this.userService.getUser();
    return this.petition.isSignedBy(user);
  }

  isOwned(): boolean {
    const user = this.userService.getUser();
    return (this.petition.owner.fbId === user.fbId);
  }

}
