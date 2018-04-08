import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
export class InitativeTrackerComponent implements OnInit {

  @Input() characters: CharacterInitative[];
  @Input() newRoundListener$: Observable<any>;

  constructor(
    private orderByPipe: OrderByPipe,
  ) { }

  ngOnInit() {
    this.newRoundListener$
      .subscribe(() => {
        this.characters.forEach((c) => {
          if (c.type === 'player') {
            c.initative = 0;
          }
        })
      });
  }

  sortCards(timeout: number = 0) {
    setTimeout(() => {
      this.characters = this.orderByPipe.transform(this.characters, 'initative');
    }, timeout);
  }
}