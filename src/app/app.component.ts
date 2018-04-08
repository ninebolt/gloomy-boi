import { Component, OnInit } from '@angular/core';

import { MonsterDeck } from "./models/deck.model";
import { MonsterCard } from './models/card.model';
import { Monster, CharacterInitative } from './models/state.model';
import { ScenarioService } from './services/scenario.service';
import { RetrievalService } from './services/retrieval.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  modalVisible = false;
  currentMonster: Monster;
  initatives: CharacterInitative[];
  monsters: Monster[] = [];

  constructor(
    private scenario: ScenarioService,
    private retrieval: RetrievalService
  ) { }

  ngOnInit() {
    this.scenario.initative$.subscribe((initatives) => this.initatives = initatives);
    this.scenario.monsters$.subscribe((monsters) => this.monsters = monsters);
  }

  monsterSearched(name: string) {
    this.scenario.getMonster(name)
      .subscribe((monster) => {
        this.currentMonster = monster;
        this.modalVisible = true;
      });
  }

  addMonsters($event) {
    this.modalVisible = false;
    if ($event.length > 0) {
      this.scenario.addMonster(this.currentMonster, $event);
    }
  }

  removeMonster($event) {
    this.scenario.removeMonter($event);
  }

  addPlayer($event) {
    this.scenario.addPlayer($event);
  }
}
