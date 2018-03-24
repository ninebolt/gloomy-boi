import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Monster, Player } from '../models/character.model';

@Injectable()
export class ScenarioService {

  monstersAdded: Subject<Monster[]>;
  playerAdded: Subject<Player>;

  constructor() {
    this.monstersAdded = new Subject();
    this.playerAdded = new Subject();
  }

  getNewMonstersAdded() {
    return this.monstersAdded;
  }

  getNewPlayerAdded() {
    return this.playerAdded;
  }

  addNewPlayer(player: Player) {
    this.playerAdded.next(player);
  }

  addNewMonsters(monsters: Monster[]) {
    this.monstersAdded.next(monsters);
  }
}