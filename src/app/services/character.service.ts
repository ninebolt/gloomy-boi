import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Monster } from '../models/character.model';

@Injectable()
export class CharacterService {
  scenarioLevel: number;

  constructor(
    private http: HttpClient
  ) {
    this.scenarioLevel = 0;

    this.storeMonsterDictionary(0)
      .subscribe((monsters) => localStorage.setItem('level0-monsters', JSON.stringify(monsters)));

    this.storeBasicMonsterInfo()
      .subscribe((monsters) => localStorage.setItem('basicMonsterInfo', JSON.stringify(monsters)));
  }

  createMonsters(name: string, amountOfNormal: number, amountOfElite: number, monsterImage: string): Monster[] {
    const monsters = new Array<Monster>();
    const stats = this.getMonster(name);

    for (let i = 0; i < amountOfNormal; i++) {
      const tempMonster = new Monster(i, name, monsterImage, stats.normalStats.health, 0);
      monsters.push(tempMonster);
    }

    for (let i = 0; i < amountOfElite; i++) {
      const tempMonster = new Monster(i, name, monsterImage, stats.normalStats.health, 0, true);
      monsters.push(tempMonster);
    }
    return monsters;
  }

  getMonster(name: string) {
    const monsters = JSON.parse(localStorage.getItem('level0-monsters')).monsters;
    return monsters[name] || {};
  }

  getBasicMonsterInfo() {
    const monsters = JSON.parse(localStorage.getItem('basicMonsterInfo')).monsters;
    return monsters || [];
  }

  getScenarioLevel(): number {
    return this.scenarioLevel;
  }

  setScenarioLevel(l: number) {
    this.scenarioLevel = l;
  }

  storeMonsterDictionary(level: number) {
    return this.http.get(`assets/monsters/stats/level${level}.json`)
      .map( res => res );
  }

  storeBasicMonsterInfo() {
    return this.http.get(`assets/monsters/monsters.json`)
      .map( res => res );
  }
}