import { Component, OnInit, Input } from '@angular/core';
import { Monster } from '../../models/character.model';
import { Deck, MonsterDeck } from '../../models/deck.model';
import { MonsterCard } from '../../models/card.model';

@Component({
  selector: 'monster-band',
  styleUrls: ['monster-band.component.scss'],
  template: `
    <div>
      <deck
        [deck]="deck"
      ></deck>
      <div *ngFor="let c of monsters">
        <monster-health [monster]="c"></monster-health>
      </div>
    </div>
  `
})
export class MonsterBandComponent implements OnInit {

  @Input() monsters: Monster[];
  @Input() monsterName: string;

  deck: Deck;

  ngOnInit() {
    this.deck = new MonsterDeck();
    for (let i = 0; i < 10; i++) {
      this.deck.insertCard(
          new MonsterCard(
              'Bandit Archer',
              4,
              [ `<span class="title">Bandit Archer - 4</span>`,
                `<span class="initiative">initiative</span>`,
                `<span class="large">body content here</span>`,
                `<span class="small">body content here</span>`,
                `<span class="shuffle">shuffle</span>`
              ],
              50,
              false
          )
      )
  }
  }
}