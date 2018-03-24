import { Component, OnInit } from '@angular/core';

import * as rawCharacters from '../../../assets/characters.json';
import { Character, Player, Monster } from '../../models/character.model';

@Component({
  selector: 'health-tracker',
  styleUrls: ['health-tracker.component.scss'],
  template: `
      <div *ngFor="let c of monsters">
        <monster-health [monster]="c"></monster-health>
      </div>
  `
})

export class HealthTrackerComponent implements OnInit {
  monsters: Monster[];

  constructor() { }

  ngOnInit() {
    this.monsters = [
      new Monster(2, rawCharacters[5].name, rawCharacters[5].image, 11, 0, true, [], 52),
      new Monster(3, rawCharacters[4].name, rawCharacters[4].image, 11, 0, false, [], 24),
      new Monster(4, rawCharacters[4].name, rawCharacters[4].image, 11, 0, false, [], 24),
      new Monster(5, rawCharacters[4].name, rawCharacters[4].image, 11, 0, false, [], 24),
      new Monster(6, rawCharacters[4].name, rawCharacters[4].image, 11, 0, false, [], 24),
      new Monster(7, rawCharacters[4].name, rawCharacters[4].image, 11, 0, false, [], 24)
    ];
  }
}