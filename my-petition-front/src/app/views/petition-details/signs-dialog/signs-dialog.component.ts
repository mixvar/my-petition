import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

import Person from '../../../model/person';


@Component({
  selector: 'app-signs-dialog',
  templateUrl: './signs-dialog.component.html',
  styleUrls: ['./signs-dialog.component.scss']
})
export class SignsDialogComponent {

  constructor(@Inject(MD_DIALOG_DATA) public signs: Array<Person>) { }

}
