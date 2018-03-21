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
    private lineParser: LineParserService,
    private orderByPipe: OrderByPipe
  ) {

    let card = {
      "shuffle": false,
      "initiative": "14",
      "lines": [
        "x1 $move$ -1",
        "x1 $attack$ -1",
        "x2 $range$ +0",
        "x1 $attack$ -1 $aoe-triangle-large-self$ ",
        "x1 <span class='small'> Create a 3 damage trap in an adjacent empty hex closest to an enemy </span>"
      ]
    };

    let monster = {
      "Bandit Guard":
      {
      "normalStats": {
        "health": 6,
        "move": 1,
        "attack": 3,
        "range": 4,
        "attributes": [

        ]
      },
      "eliteStats": {
        "health": 7,
        "move": 1,
        "attack": 4,
        "range": 5,
        "attributes": [
          "$pierce$ 2",
          "$shield$ 1"
        ]
      }
    }
    };

    console.log(lineParser.parseCurrentCard(card, monster["Bandit Guard"]));
    console.log(lineParser.parseAttributes(monster["Bandit Guard"]));
  }

  ngOnInit() {
    this.characters = [
      new Player(1, 'Character', rawCharacters[0].name, rawCharacters[0].icon, 11, 12, [], 70),
      new Monster(2, 'Character', rawCharacters[5].name, rawCharacters[5].icon, 11, 12, [], 52),
      new Monster(3, 'Character', rawCharacters[4].name, rawCharacters[4].icon, 11, 12, [], 24)
    ];
    this.sortCards();
  }

  sortCards(timeout: number = 0) {
    setTimeout(() => {
      this.characters = this.orderByPipe.transform(this.characters, 'initative');
    }, timeout);
  }

}
