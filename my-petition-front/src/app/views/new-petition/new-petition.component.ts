import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import IMarkdownService from '../../services/markdown/markdown.service.interface';
import IPetitionsService from '../../services/petitions/petitions.service.interface';
import IUserService from '../../services/user/user.service.interface';
import INotificationsService from '../../services/notifications/notifications.service.interface';
import PetitionDetails from '../../model/petition-details';
import NewPetitionResponse from '../../model/response/new-petition-response';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogParams
} from '../../components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-new-petition',
  templateUrl: './new-petition.component.html',
  styleUrls: ['./new-petition.component.scss']
})
export class NewPetitionComponent implements OnInit {

  form: FormGroup;
  sending: boolean = false;

  private static rawTagsToArray(tags: string): Array<string> {
    if (!tags || tags === '') {
      return [];
    }
    return tags.split(/(\s+)/)
      .filter(e => e.trim().length > 0);
  }

  private static hashTagValidator(control: FormControl): { [errorName: string]: boolean } {
    const valid = NewPetitionComponent.rawTagsToArray(control.value)
      .reduce((areValid, tag) =>
          (areValid && /^#\S+$/.test(tag)),
        true);

    return (valid) ? null : { invalidTags: true };
  }

  private static checkboxValidator(control: FormControl): { [errorName: string]: boolean } {
    const valid: boolean = !!control.value;
    return (valid) ? null : { required: true };
  }

  constructor(private markdownService: IMarkdownService,
              private petitionsService: IPetitionsService,
              private userService: IUserService,
              private fb: FormBuilder,
              private notificationsService: INotificationsService,
              private router: Router,
              private dialog: MdDialog) {

    this.form = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      addressee: ['', Validators.required],
      tags: ['', Validators.compose([Validators.required, NewPetitionComponent.hashTagValidator])],
      text: ['', Validators.required],
      isSigned: [false, NewPetitionComponent.checkboxValidator],
    });
  }

  ngOnInit() {
  }

  getParsedText(): string {
    return this.markdownService.parse(this.form.value.text);
  }

  onSubmit(values: any) {
    const dialogParams: ConfirmationDialogParams = {
      title: 'Create petition',
      content: 'Are you sure you want to create this petition?',
      cancel: 'Cancel',
      confirm: 'Create'
    };

    const signDialog = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogParams,
      width: '75%',
      disableClose: true,
    });

    signDialog.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.sendPetition(this.createPetition(values));
      }
    });
  }

  private createPetition(values: any): PetitionDetails {
    const { title, description, addressee, tags, text } = values;
    const user = this.userService.getUser();
    const serializedText = this.markdownService.serialize(text);
    const tagsArray = NewPetitionComponent.rawTagsToArray(tags);

    return PetitionDetails.newPetition(user, title, description, addressee, tagsArray, serializedText);
  }

  private sendPetition(petition: PetitionDetails) {
    this.sending = true;
    this.petitionsService.addPetition(petition)
      .subscribe(
        (response: NewPetitionResponse) => {
          this.sending = false;
          this.notificationsService.success('petition created successfully!');
          this.router.navigate([`/petitions/${response.petitionId}`]);
        },
        (error) => {
          this.sending = false;
          console.error('error while adding new petition!', error);
          this.notificationsService.error(error.message);
        }
      );
  }

}
