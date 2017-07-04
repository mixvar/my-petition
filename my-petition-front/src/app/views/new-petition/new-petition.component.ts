import { Component, OnInit } from '@angular/core';
import IMarkdownService from '../../services/markdown/markdown.service.interface';
import NewPetition from '../../model/new-petition';

@Component({
  selector: 'app-new-petition',
  templateUrl: './new-petition.component.html',
  styleUrls: ['./new-petition.component.scss']
})
export class NewPetitionComponent implements OnInit {

  rawTags: string;
  rawText: string;
  petition: NewPetition = new NewPetition();

  constructor(private markdownService: IMarkdownService) { }

  ngOnInit() {
  }

  getParsedText() {
    return this.markdownService.parse(this.rawText);
  }

  onSubmit() {
    this.petition.text = this.markdownService.serialize(this.rawText);
    console.log(this.petition);
    this.rawText = this.markdownService.deserialize(this.petition.text);
  }

}
