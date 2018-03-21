import { Component, Input, Output, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

import { Character, Player, Monster } from '../../models/character.model';

@Component({
  selector: 'character-health',
  styleUrls: ['character-health.component.scss'],
  template: `
    <div class="health-wrapper">
      <h4 class="name">{{character.name}}</h4>
      <h2 class="id" [style.background-image]="iconURL">{{character.id}}</h2>
      <button class="plus-ticker" (click)="addHealth()">+</button>
      <h5 class="health">{{character.health}}</h5>
      <button class="minus-ticker" (click)="subtractHealth()">-</button>
      <h3 class="armor">{{character.armor}}</h3>
      <div class="status status1" title="status1" style="background-image: url('/assets/character-icons/dragon.jpg')"></div>
      <div class="status status2" title="status2" style="background-image: url('/assets/character-icons/dragon.jpg')"></div>
      <div class="status status3" title="status3" style="background-image: url('/assets/character-icons/dragon.jpg')"></div>
      <div class="status status4" title="status4" style="background-image: url('/assets/character-icons/dragon.jpg')"></div>
      <div class="status status5" title="status5" style="background-image: url('/assets/character-icons/dragon.jpg')"></div>
      <div class="status status6" title="status6" style="background-image: url('/assets/character-icons/dragon.jpg')"></div>
      <div class="status status7" title="status7" style="background-image: url('/assets/character-icons/dragon.jpg')"></div>
      <div class="status status8" title="status8" style="background-image: url('/assets/character-icons/dragon.jpg')"></div>
    </div>
  `
})

export class CharacterHealthComponent implements OnInit {
  @Input()
  character: Character;

  iconURL: SafeStyle;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.iconURL = this.sanitizer.bypassSecurityTrustStyle('url(' + this.character.icon + ')');
  }

  addHealth() {
    this.character.health++;
  }

  subtractHealth() {
    if (this.character.health === 1) {

    } else {
      this.character.health--;
    }
  }
}
