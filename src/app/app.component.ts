import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

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
  initatives: CharacterInitative[] = [];
  monsters: Monster[] = [];

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
    this.newRound$ = this.newRoundSubject.asObservable();
    this.sort$ = this.sortSubject.asObservable();
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

  newRound() {
    this.newRoundSubject.next();
  }

  closeModal() {
    this.modalVisible = false;
  }

  updateInitatives(newInitatives: CharacterInitative[]) {
    const current = [];
    const newInit = []
    for (var i = 0; i < this.initatives.length; i++) {
      current.push(this.initatives[i].name);
    }
    for (var i = 0; i < newInitatives.length; i++) {
      newInit.push(newInitatives[i].name);
    }
    const filteredInitative = newInitatives.filter((c) => current.indexOf(c.name) === -1);
    const temp = this.initatives.concat(filteredInitative);
    this.initatives = temp.filter((t) => newInit.indexOf(t.name) === -1);
    this.sortSubject.next();
  }

  checkIfInInitative(newInitatives: CharacterInitative[]): boolean {
    return this.initatives.some((initative) => {
      var includes: boolean = false;
      for (var i = 0; i < newInitatives.length; i++) {
        if (initative.name === newInitatives[i].name) {
          includes = true;
          break;
        }
      }
      return includes;
    });
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
}
