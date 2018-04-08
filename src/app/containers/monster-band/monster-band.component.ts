import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Monster } from '../../models/state.model';

@Component({
  selector: 'monster-band',
  styleUrls: ['monster-band.component.scss'],
  template: `
    <div class="monster-band">
      <div *ngFor="let m of monsters">
        {{ m | json }}
      </div>
    </div>
  `
})
export class MonsterBandComponent {

  @Input() monsters: Monster[];
}