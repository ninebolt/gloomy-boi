import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Monster } from '../models/character.model';

@Injectable()
export class ScenarioService {

  monstersAdded: Subject<Monster[]>;

  constructor() {
    this.monstersAdded = new Subject();
  }

  getNewMonstersAdded() {
    return this.monstersAdded;
  }

  addNewMonsters(monsters: Monster[]) {
    this.monstersAdded.next(monsters);
  }
}