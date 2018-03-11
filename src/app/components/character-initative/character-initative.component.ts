import { Component, Input } from '@angular/core';
import { Character } from '../../models/character.model';

@Component({
  selector: 'character-initative',
  styleUrls: ['character-initative.component.scss'],
  template: `
    <div class="character">
      {{character.name}}
      <img [src]="character.icon" />
    </div>
  `
})
export class CharacterInitativeComponent {
  
  @Input() character: Character;

}