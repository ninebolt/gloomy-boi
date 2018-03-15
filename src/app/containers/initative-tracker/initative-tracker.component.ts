import { Component, OnInit } from '@angular/core';

import { OrderByPipe } from '../../pipes/order-by.pipe';

import * as rawCharacters from '../../../assets/characters.json';
import { Character, Player, Monster } from '../../models/character.model';
import { LineParserService } from '../../services/line-parser.service';

@Component({
  selector: 'initative-tracker',
  styleUrls: ['initative-tracker.component.scss'],
  template: `
    <div class="tracker">
      <div class="characters">
        <div *ngFor="let c of characters">
          <character-initative [character]="c" (resort)="sortCards(100)"></character-initative>
        </div>
      </div>
      <span class="name">
        Initative Tracker
      </span>
    </div>
  `,
  providers: [OrderByPipe]
})
export class InitativeTrackerComponent implements OnInit {

  characters: Character[];

  constructor(
    private orderByPipe: OrderByPipe,
    private lineParser: LineParserService
  ) { }

  ngOnInit() {
    this.characters = [
      new Player(rawCharacters[0].name, rawCharacters[0].icon, 70),
      new Monster(rawCharacters[5].name, rawCharacters[5].icon, 52),
      new Monster(rawCharacters[4].name, rawCharacters[4].icon, 24)
    ];

    this.sortCards();
  }

  sortCards(timeout: number = 0) {
    setTimeout(() => {
      this.characters = this.orderByPipe.transform(this.characters, 'initative');
    }, timeout);
  }

}