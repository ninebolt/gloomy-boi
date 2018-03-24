import { Component, Input, Output, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { Monster } from '../../models/character.model';

@Component({
  selector: 'monster-health',
  styleUrls: ['monster-health.component.scss'],
  template: `
    <div class="health-wrapper">
      <div class="monster-id">{{ monster.id }}</div>
      <div class="monster-image">
        <img [src]="monster.image" />
      </div>
      <div class="health">
        <span class="current-health">{{ monster.health }}</span>
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

export class MonsterHealthComponent implements OnInit {
  @Input()
  monster: Monster;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() { }

  addHealth() {
    this.monster.health++;
  }

  subtractHealth() {
    if (this.monster.health === 1) {

    } else {
      this.monster.health--;
    }
  }

  setStatus(event) {
    event.target.classList.toggle('active');
  }
}
