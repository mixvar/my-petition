import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(private markdownService: IMarkdownService,
              private petitionsService: IPetitionsService,
              private userService: IUserService,
              private fb: FormBuilder) {

    this.form = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      addressee: ['', Validators.required],
      tags: ['', Validators.compose([Validators.required, NewPetitionComponent.hashTagValidator])],
      text: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  getParsedText(): string {
    return this.markdownService.parse(this.form.value.text);
  }

  onSubmit(values: any) {
    const { title, description, addressee, tags, text } = values;
    const user = this.userService.getUser();
    const serializedText = this.markdownService.serialize(text);
    const tagsArray = NewPetitionComponent.rawTagsToArray(tags);

    const petition = PetitionDetails.newPetition(user, title, description, addressee, tagsArray, serializedText);
    this.sendPetition(petition);
  }

  private sendPetition(petition: PetitionDetails) {
    this.sending = true;
    this.petitionsService.addPetition(petition)
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

}
