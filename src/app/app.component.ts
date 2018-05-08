import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { MonsterDeck } from "./models/deck.model";
import { MonsterCard } from './models/card.model';
import { Monster, CharacterInitative, ScenarioState } from './models/state.model';
import { ScenarioService } from './services/scenario.service';
import { RetrievalService } from './services/retrieval.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  monsterModalVisible = false;
  playerModalVisible = false;
  globalLevel: number = 1;
  currentMonster: Monster;
  initatives: CharacterInitative[] = [];
  monsters: Monster[] = [];
  state$: Observable<ScenarioState>;

  newRoundSubject: Subject<any> = new Subject();
  newRound$: Observable<any>;

  sortSubject: Subject<any> = new Subject();
  sort$: Observable<any>;

  constructor(
    private scenario: ScenarioService,
    private retrieval: RetrievalService
  ) { }

  ngOnInit() {
    this.scenario.initative$.subscribe((initatives) => this.updateInitatives(initatives));
    this.scenario.monsters$.subscribe((monsters) => this.monsters = monsters);
    this.scenario.globalLevel$.subscribe((globalLevel) => this.globalLevel = globalLevel);
    this.newRound$ = this.newRoundSubject.asObservable();
    this.sort$ = this.sortSubject.asObservable();
    this.scenario.loadState();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.scenario.saveState();
  }

  monsterSearched(name: string) {
    this.scenario.getMonster(name)
      .subscribe((monster) => {
        this.currentMonster = monster;
        this.currentMonster.level = this.globalLevel;
        this.monsterModalVisible = true;
      });
  }

  addMonsters($event) {
    this.monsterModalVisible = false;
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

  newRound() {
    this.playerModalVisible = true;
  }

  continueNewRound() {
    this.playerModalVisible = false;
    this.newRoundSubject.next();
  }

  closeMonsterModal() {
    this.monsterModalVisible = false;
  }

  closeInitativeModal() {
    this.playerModalVisible = false;
  }

  updateInitatives(newInitatives: CharacterInitative[]) {
    newInitatives.forEach((init) => {
      const oldValue = this.getInitativeFromName(init.name, this.initatives);
      if (oldValue !== -1) {
        init.initative = oldValue;
      }
    });
    this.initatives = newInitatives;
    this.sortSubject.next();
  }

  getInitativeFromName(name: string, initatives: CharacterInitative[]): number {
    for (var i = 0; i < initatives.length; i++) {
      if (initatives[i].name === name) {
        return initatives[i].initative;
      }
    }
    return -1;
  }

  initativeChange(initative: number, monsterName: string) {
    const index = this.initatives.findIndex((initative) => {
      return initative.name === monsterName;
    });
    if (index !== -1) {
      this.initatives[index].initative = initative;
    }
    this.sortSubject.next();
  }

  deleteCharacter(character: CharacterInitative) {
    if (character.type === 'monster') {
      this.scenario.removeMonter(character.name);
    } else if (character.type === 'player') {
      this.scenario.removePlayer(character.name);
    }
  }

  updateGlobalLevel(l: number) {
    this.globalLevel = l;
    this.scenario.setGlobalLevel(l);
  }

  reset() {
    this.scenario.reset();
  }
}
