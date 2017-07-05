import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(@Inject(MD_DIALOG_DATA) public params: ConfirmationDialogParams) { }

}

export interface ConfirmationDialogParams {
  title: string;
  content: string;
  cancel: string;
  confirm: string;
}
