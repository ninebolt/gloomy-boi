import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../models/character.model';

@Component({
  selector: 'character-initative',
  styleUrls: ['character-initative.component.scss'],
  template: `
    <div class="character">
      <img class="icon" [ngClass]="character.type" [src]="character.icon" />
      <span class="name">{{character.name}}</span>
      <input class="initative" type="number" value="character.initative" [(ngModel)]="character.initative" (blur)="sortCards()"/>
    </div>
  `
})
export class CharacterInitativeComponent {

  @Input() character: Character;

  @Output() resort: EventEmitter<any> = new EventEmitter();

  sortCards() {
    this.resort.emit();
  }
}