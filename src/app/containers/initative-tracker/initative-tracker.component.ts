import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { LineParserService } from '../../services/line-parser.service';
import { ScenarioService } from '../../services/scenario.service';
import { OrderByPipe } from '../../pipes/order-by.pipe';

import { Character, Player, Monster } from '../../models/character.model';

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

  characters: Character[] = [];
  playerAdded: Subject<Player>;
  characterAdded: Subject<Character>;

  constructor(
    private lineParser: LineParserService,
    private orderByPipe: OrderByPipe,
    private scenarioService: ScenarioService
  ) {
  }

  ngOnInit() {
    this.characters = [];
    this.scenarioService.getNewPlayerAdded()
      .subscribe((player) => this.addToInitativeTracker(player));
    this.scenarioService.getNewMonstersAdded()
      .subscribe((monsters) => this.addToInitativeTracker(monsters[0]));
  }

  sortCards(timeout: number = 0) {
    setTimeout(() => {
      this.characters = this.orderByPipe.transform(this.characters, 'initative');
    }, timeout);
  }

  addToInitativeTracker(c: Character) {
    let exists = false;
    this.characters.forEach((character) => {
      if (character.name === c.name) {
        exists = true;
      }
    });

    if (!exists) {
      c.initative = 0;
      this.characters.push(c);
    }
  }

}
