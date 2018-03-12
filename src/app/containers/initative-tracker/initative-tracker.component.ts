import { Component, OnInit } from '@angular/core';

import * as rawCharacters from '../../../assets/characters.json';

import { Character, Player, Monster } from '../../models/character.model';

@Component({
  selector: 'initative-tracker',
  styleUrls: ['initative-tracker.component.scss'],
  template: `
    <div *ngFor="let c of characters">
      <character-initative [character]="c"></character-initative>
      Test
    </div>
  `
})
export class InitativeTrackerComponent implements OnInit {

  characters: Character[];

  ngOnInit() {
    this.characters = [
      new Player(rawCharacters[0].name, rawCharacters[0].icon, 18),
      new Player(rawCharacters[4].name, rawCharacters[4].icon, 18)
    ];
    console.log(this.characters);
  }

}
