import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from '../../../../node_modules/rxjs/Subscription';
import { MdDialog } from '@angular/material';

import IPetitionsService from '../../services/petitions/petitions.service.interface';
import PetitionDetails from '../../model/petition-details';
import IMarkdownService from '../../services/markdown/markdown.service.interface';
import IUserService from '../../services/user/user.service.interface';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogParams
} from 'app/components/confirmation-dialog/confirmation-dialog.component';
import INotificationsService from '../../services/notifications/notifications.service.interface';
import { SignsDialogComponent } from './signs-dialog/signs-dialog.component';


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
              private userService: IUserService,
              private notificationsService: INotificationsService,
              private dialog: MdDialog) { }

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
    return (user && this.petition.owner.fbId === user.fbId);
  }

  onSignsList(): void {
    this.dialog.open(SignsDialogComponent, {
      data: this.petition.signs,
      width: '400px',
      disableClose: false,
    });
  }

  onSign(): void {
    const dialogParams: ConfirmationDialogParams = {
      title: 'Sign petition',
      content: 'Are you sure you want to sign this petition?',
      cancel: 'Cancel',
      confirm: 'Sign'
    };

    const signDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogParams,
      width: '75%',
      disableClose: true,
    });

    signDialog.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.doSign();
      }
    });
  }

  private doSign(): void {
    this.fetching = true;
    this.petitionsService.signPetition(this.petition.id).subscribe(
      () => {},
      (error) => {
        this.fetching = false;
        console.error(error);
        this.notificationsService.error('Could not sign petition - unexpected error!');
      },
      () => {
        this.fetching = false;
        this.notificationsService.success('Petition signed!');
        this.petition.signs.push(this.userService.getUser());
        this.petition.signCount++;
      }
    );
  }

}
