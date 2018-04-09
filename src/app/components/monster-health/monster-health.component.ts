import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Monster } from '../../models/character.model';
import { Entity } from '../../models/state.model';

@Component({
  selector: 'monster-health',
  styleUrls: ['monster-health.component.scss'],
  template: `
    <div class="health-wrapper">
      <div class="monster-id" [ngClass]="{ 'elite': monster.isElite }">{{ monster.id }}</div>
      <div class="monster-image">
        <img [src]="image" />
      </div>
      <div class="health" [ngClass]="{ 'elite': monster.isElite }">
        <span class="current-health">{{ monster.currentHealth }}</span>
        <div class="health-buttons">
          <span class="button top" (click)="addHealth()">+</span>
          <span class="button bottom" (click)="subtractHealth()">-</span>
        </div>
      </div>
      <div class="conditions">
        <div class="status disarm" title="Disarm" (click)="setStatus($event)"></div>
        <div class="status immobilize" title="Immobilize" (click)="setStatus($event)"></div>
        <div class="status invisible" title="Invisible" (click)="setStatus($event)"></div>
        <div class="status muddle" title="Muddle" (click)="setStatus($event)"></div>
        <div class="status poison" title="Poison" (click)="setStatus($event)"></div>
        <div class="status strengthen" title="Strengthen" (click)="setStatus($event)"></div>
        <div class="status stun" title="Stun" (click)="setStatus($event)"></div>
        <div class="status wound" title="Wound" (click)="setStatus($event)"></div>
      </div>
    </div>
  `
})

export class MonsterHealthComponent {

  @Input() monster: Entity;
  @Input() image: string;

  @Output() healthDepleted: EventEmitter<any> = new EventEmitter();

  addHealth() {
    this.monster.currentHealth++;
  }

  subtractHealth() {
    if (this.monster.currentHealth === 1) {
      this.healthDepleted.emit(this.monster.id);
    } else {
      this.monster.currentHealth--;
    }
  }

  setStatus(event) {
    event.target.classList.toggle('active');
  }
}
