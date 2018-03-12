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
  private characterList = rawCharacters['characters'];

  ngOnInit() {
    this.characters = [
      new Player(this.characterList[0].name, this.characterList[0].icon, 18),
      new Player(this.characterList[4].name, this.characterList[4].icon, 18)
    ];
    console.log(this.characters);
  }

}
