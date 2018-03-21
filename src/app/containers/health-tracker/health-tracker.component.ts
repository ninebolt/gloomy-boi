import { Component, OnInit } from '@angular/core';

import * as rawCharacters from '../../../assets/characters.json';
import { Character, Player, Monster } from '../../models/character.model';

@Component({
  selector: 'health-tracker',
  styleUrls: ['health-tracker.component.scss'],
  template: `
    <h3>Players</h3>
    <div class="player-container">
      <div *ngFor="let c of characters">
        <div *ngIf="c.type ===  'Player'">
          <character-health [character]="c"></character-health>
        </div>
      </div>
    </div>

    <h3>Monsters</h3>
    <div class="monster-container">
      <div *ngFor="let c of characters">
        <div *ngIf="c.type ===  'Monster'">
          <character-health [character]="c"></character-health>
        </div>
      </div>
    </div>
  `
})

export class HealthTrackerComponent implements OnInit {
  characters: Character[];

  constructor() { }

  ngOnInit() {
    this.characters = [
      new Player(1, 'Player', rawCharacters[0].name, rawCharacters[0].icon, 1, 12, [], 70),
      new Monster(2, 'Monster', rawCharacters[5].name, rawCharacters[5].icon, 11, 12, [], 52),
      new Monster(3, 'Monster', rawCharacters[4].name, rawCharacters[4].icon, 11, 12, [], 24)
    ];
  }
}