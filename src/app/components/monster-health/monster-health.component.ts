import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';

import { Monster } from '../../models/character.model';
import { Entity } from '../../models/state.model';

import { TooltipComponent } from '../../components/tooltip/tooltip.component';

@Component({
  selector: 'monster-health',
  styleUrls: ['monster-health.component.scss'],
  template: `
    <div class="monster-health">
      <div class="health-container" [ngClass]="{ 'elite': monster.isElite }">
        <div class="monster-info">
          <div class="icon-holder">
            <span><i class="fa fa-hashtag" aria-hidden="true"></i></span>
            <span class="text monster-id">{{ monster.id }}</span>
          </div>
          <div class="icon-holder">
            <span><i class="fa fa-heart" aria-hidden="true"></i></span>
            <span class="text health">{{ monster.currentHealth }}</span>
          </div>
          <div class="icon-holder">
            <span><i class="fa fa-shield" aria-hidden="true"></i></span>
            <span class="text shield">{{ monster.shield }}</span>
          </div>
          <div class="health-buttons">
            <span class="button top" (click)="addHealth()"><i class="fa fa-plus" aria-hidden="true"></i></span>
            <span class="button bottom" (click)="subtractHealth()"><i class="fa fa-minus" aria-hidden="true"></i></span>
          </div>
        </div>
      </div>
      <div class="conditions">
        <div tooltip="Disarm" class="status disarm" title="Disarm" (click)="setStatus($event)"></div>
        <div tooltip="Immobilize" class="status immobilize" title="Immobilize" (click)="setStatus($event)"></div>
        <div tooltip="Invisible" class="status invisible" title="Invisible" (click)="setStatus($event)"></div>
        <div tooltip="Muddle" class="status muddle" title="Muddle" (click)="setStatus($event)"></div>
        <div tooltip="Poison" class="status poison" title="Poison" (click)="setStatus($event)"></div>
        <div tooltip="Strengthen" class="status strengthen" title="Strengthen" (click)="setStatus($event)"></div>
        <div tooltip="Stun" class="status stun" title="Stun" (click)="setStatus($event)"></div>
        <div tooltip="Wound" class="status wound" title="Wound" (click)="setStatus($event)"></div>
        <div tooltip="Delete" class="status delete" title="Delete" (click)="killMonster()"></div>
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

  killMonster() {
    this.monster.currentHealth = 0;
    this.healthDepleted.emit(this.monster.id);
  }
}
