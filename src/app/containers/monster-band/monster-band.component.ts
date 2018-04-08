import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MonsterDeckComponent} from '../../components/monster-deck/monster-deck.component';

import { LineParserService } from '../../services/line-parser.service';
import { MonsterCardService } from '../../services/monster-card.service';

import { Monster } from '../../models/state.model';
import { MonsterCard } from '../../models/card.model';
import { MonsterDeck, Deck } from '../../models/deck.model';
import { RetrievalService } from '../../services/retrieval.service';

@Component({
  selector: 'monster-band',
  styleUrls: ['monster-band.component.scss'],
  template: `
    <div class="monster-band">
      <div class="monster-deck">
        <monster-deck *ngIf="monsterDeckCreated" [deck]="monster.deck" [newRoundListener$]="newRoundListener$"></monster-deck>
      </div>
      <div class="monster-healths">
        <monster-health *ngFor="let m of monster.entities | orderBy:'id'; let i = index;" [monster]="m" [image]="monster.image" (healthDepleted)="removeMonster($event)"></monster-health>
      </div>
    </div>
  `,
})
export class MonsterBandComponent {

  @Input() monster: Monster;
  @Input() newRoundListener$: Observable<any>;
  @Output() destroyMonster: EventEmitter<string> = new EventEmitter();

  monsterDeckCreated: boolean = false;
  attributes: string[] = [];

  constructor(
    private monsterCardService: MonsterCardService,
    private lineParser: LineParserService,
    private r: RetrievalService
  ) { }

  ngOnInit() {
    let cards = this.monsterCardService.getMonsterCards(this.monster.name);
    this.r.getMonsterStats(this.monster.name, this.monster.level)
      .subscribe((stats) => {
        const monsterCards = [];
        cards.forEach(card => {
          card = new MonsterCard(this.monster.name, this.monster.level,
              this.lineParser.parseCurrentCard(card, stats), card.initiative, card.shuffle);
              monsterCards.push(card);
        });
        this.monster.deck = new MonsterDeck(monsterCards);
        this.monster.deck.shuffle();
        this.attributes = this.lineParser.parseAttributes(stats);
        this.monsterDeckCreated = true;
      })
  }

  removeMonster(monsterId: number) {
    setTimeout(() => {
      const index = this.monster.entities.findIndex((m) => {
        return m.id === monsterId;
      });
      this.monster.entities.splice(index, 1);
      if (this.monster.entities.length === 0) {
        this.destroyMonster.emit(this.monster.name);
      }
    }, 100);
  }
}