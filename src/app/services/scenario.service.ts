import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import { ScenarioState, Player, Monster, NewMonster, Entity, CharacterInitative, Stats } from '../models/state.model';
import { RetrievalService } from './retrieval.service';

@Injectable()
export class ScenarioService {

  private scenarioState: ScenarioState = {
    players: [],
    monsters: []
  };

  private initativeSubject: Subject<CharacterInitative[]> = new Subject();
  initative$: Observable<CharacterInitative[]>;

  private monsterSubject: Subject<Monster[]> = new Subject();
  monsters$: Observable<Monster[]>;

  constructor(
    private r: RetrievalService
  ) {
    this.initative$ = this.initativeSubject.asObservable();
    this.monsters$ = this.monsterSubject.asObservable();
  }

  addPlayer(name: string) {
    if (this.findCharacterIndex(name, 'players') !== -1) {
      return;
    }
    this.r.getPlayerInfo(name)
      .subscribe((p) => {
        this.scenarioState.players.push(p);
        this.updateInitatives();
      });
  }

  addMonster(m: Monster, newMonsters: NewMonster[]) {
    this.r.getMonsterStats(m.name, m.level)
      .subscribe((stats) => {
        if (!m.entities) {
          m.entities = [];
        }
        m.entities.push(...this.createMonsterEntities(newMonsters, stats.normalStats, stats.eliteStats));
        m.entities = this.sortMonsterEntities(m.entities);
        this.updateScenarioWithMonster(m);
      });
  }

  removeMonter(name: string) {
    const monsterIndex = this.findCharacterIndex(name, 'monsters');
    if (monsterIndex !== -1) {
      this.scenarioState.monsters.splice(monsterIndex, 1);
      this.monsterSubject.next(this.scenarioState.monsters);
      this.updateInitatives();
    }
  }

  getMonster(name: string) {
    const monsterIndex = this.findCharacterIndex(name, 'monsters');
    if (monsterIndex === -1) {
      return this.r.getMonsterInfo(name);
    }
    return Observable.of(this.scenarioState.monsters[monsterIndex]);
  }

  createMonsterEntities(newMonsters: NewMonster[], normal: Stats, elite: Stats): Entity[] {
    const e: Entity[] = [];
    newMonsters.forEach((monster) => {
      if (monster.status === 'elite') {
        e.push({ id: monster.id, isElite: true, currentHealth: elite.health, maxHealth: elite.health });
      } else if (monster.status === 'normal') {
        e.push({ id: monster.id, isElite: false, currentHealth: normal.health, maxHealth: normal.health });
      }
    });
    return e;
  }

  sortMonsterEntities(entities: Entity[]): Entity[] {
    entities.sort((a: any, b: any) => {
      if (a.id > b.id) {
        return 1;
      } else if (a.id < b.id) {
        return -1;
      } else {
        return 0;
      }
    });
    return entities;
  }

  findCharacterIndex(name: string, type: string) {
    return this.scenarioState[type].findIndex((s) => {
      return s.name === name;
    });
  }

  updateInitatives() {
    const initatives: CharacterInitative[] = [];
    this.scenarioState.monsters.forEach((m) => initatives.push({ name: m.name, initative: m.initative, image: m.image }));
    this.scenarioState.players.forEach((p) => initatives.push({ name: p.name, initative: p.initative, image: p.image }));
    this.initativeSubject.next(initatives);
  }

  updateScenarioWithMonster(m: Monster) {
    const monsterIndex = this.findCharacterIndex(m.name, 'monsters');
    if (monsterIndex === -1) {
      this.scenarioState.monsters.push(m);
    } else {
      this.scenarioState.monsters[monsterIndex] = m;
    }
    this.monsterSubject.next(this.scenarioState.monsters);
    this.updateInitatives();
  }
}