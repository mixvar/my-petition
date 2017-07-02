import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: '1' })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('250ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ],
})
export class LoaderComponent {

  @Input()
  public loading: boolean = false;

  @Input()
  public color: string = 'primary';

  @Input()
  public scale: number = 1;

  constructor() { }

  getScaleStyle() {
    return `scale(${this.scale})`;
  }
}
