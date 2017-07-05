import { Component, OnInit } from '@angular/core';

import IMarkdownService from '../../services/markdown/markdown.service.interface';
import PetitionDetails from '../../model/petition-details';
import IPetitionsService from '../../services/petitions/petitions.service.interface';
import IUserService from '../../services/user/user.service.interface';


@Component({
  selector: 'app-new-petition',
  templateUrl: './new-petition.component.html',
  styleUrls: ['./new-petition.component.scss']
})
export class NewPetitionComponent implements OnInit {

  rawTags: string;
  rawText: string;
  petition: PetitionDetails = new PetitionDetails();
  sending: boolean = false;

  constructor(private markdownService: IMarkdownService,
              private petitionsService: IPetitionsService,
              private userService: IUserService) { }

  ngOnInit() {
  }

  getParsedText(): string {
    return this.markdownService.parse(this.rawText);
  }

  onSubmit() {
    this.petition.text = this.markdownService.serialize(this.rawText);
    if (this.validateTags()) {
      this.petition.tags = this.rawTagsToArray();

      this.petition.initializeNewPetition(this.userService.getUser());
      this.sendPetition();

    } else {
      console.warn('invalid tags!', this.rawTags);
    }
  }

  private sendPetition() {
    this.sending = true;
    this.petitionsService.addPetition(this.petition)
      .subscribe(
        () => {},
        (error) => {
          this.sending = false;
          console.error('error while adding new petition!', error);
        },
        () => {
          this.sending = false;
          console.log('petition created successfully!');
        }
      );
  }

  private rawTagsToArray() {
    if (!this.rawTags) {
      return [];
    }

    return this.rawTags.split(/(\s+)/)
      .filter(e => e.trim().length > 0);
  }

  private validateTags(): boolean {
    return this.rawTagsToArray()
      .reduce((areValid, tag) =>
          (areValid && /^#\S+$/.test(tag)),
        true);
  }

}
