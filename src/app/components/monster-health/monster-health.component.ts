import { Component, Input, Output, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { Monster } from '../../models/character.model';

@Component({
  selector: 'monster-health',
  styleUrls: ['monster-health.component.scss'],
  template: `
    <div class="health-wrapper">
      <div class="icon" [style.background-image]="imageURL"></div>
      <h5 class="id">{{monster.id}}</h5>
      <button class="plus-ticker" (click)="addHealth()">+</button>
      <h1 class="health">{{monster.health}}</h1>
      <button class="minus-ticker" (click)="subtractHealth()">-</button>
      <div class="status disarm" title="Disarm" (click)="setStatus($event)"></div>
      <div class="status immobilize" title="Immobilize" (click)="setStatus($event)"></div>
      <div class="status invisible" title="Invisible" (click)="setStatus($event)"></div>
      <div class="status muddle" title="Muddle" (click)="setStatus($event)"></div>
      <div class="status poison" title="Poison" (click)="setStatus($event)"></div>
      <div class="status strengthen" title="Strengthen" (click)="setStatus($event)"></div>
      <div class="status stun" title="Stun" (click)="setStatus($event)"></div>
      <div class="status wound" title="Wound" (click)="setStatus($event)"></div>
    </div>
  `
})

export class MonsterHealthComponent implements OnInit {
  @Input()
  monster: Monster;

  imageURL: SafeStyle;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.imageURL = this.sanitizer.bypassSecurityTrustStyle('url(' + this.monster.image + ')');
  }

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
