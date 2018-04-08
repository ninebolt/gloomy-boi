import { Component, Input } from '@angular/core';

import { CombatCard } from '../../models/card.model';

@Component({
    selector: 'combat-card',
    styleUrls: ['combat-card.component.scss'],
    template: `
        <div class="card-back"></div>
        <div class="card-front">
          <div [ngClass]="getCardValue()"></div>
          <div></div>
        </div>
    `
})
export class CombatCardComponent {

  @Input() card: CombatCard;

  constructor() {}

  private getCardValue() {
    return this.card.value;
  }

}
