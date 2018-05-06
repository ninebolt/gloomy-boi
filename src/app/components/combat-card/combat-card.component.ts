import { Component, Input } from '@angular/core';

import { CombatCard } from '../../models/card.model';

@Component({
    selector: 'combat-card',
    styleUrls: ['combat-card.component.scss'],
    template: `
        <div class="card-back"></div>
        <div class="card-front" *ngIf="card">
          <div *ngIf="!showTwo" [ngClass]="card.value"></div>
          <div *ngIf="showTwo" class="blank-front">
            <div [ngClass]="'denomination--' + advOne" [ngStyle]="{'left': '-4.5em'}"></div>
            <div [ngClass]="'denomination--' + advTwo" [ngStyle]="{'left': '4.5em'}"></div>
          </div>
        </div>
    `
})
export class CombatCardComponent {

  @Input() card: CombatCard;
  @Input() showTwo: boolean;
  @Input() advOne: string;
  @Input() advTwo: string;

  constructor() {}
}
