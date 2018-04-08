import { Component, Input, OnInit } from '@angular/core';

import { OrderByPipe } from '../../pipes/order-by.pipe';
import { CharacterInitative } from '../../models/state.model';

@Component({
  selector: 'initative-tracker',
  styleUrls: ['initative-tracker.component.scss'],
  template: `
    <div>
      <div *ngFor="let c of characters">
        <initative [character]="c" (resort)="sortCards(100)"></initative>
      </div>
    </div>
  `,
  providers: [OrderByPipe]
})
export class InitativeTrackerComponent {

  @Input() characters: CharacterInitative[];

  constructor(
    private orderByPipe: OrderByPipe,
  ) { }

  sortCards(timeout: number = 0) {
    setTimeout(() => {
      this.characters = this.orderByPipe.transform(this.characters, 'initative');
    }, timeout);
  }
}