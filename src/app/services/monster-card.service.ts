import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MonsterCardService {

  constructor(
    private http: HttpClient
  ) {
    this.storeMonsterCards()
      .subscribe(cards => localStorage.setItem('monsterCards', JSON.stringify(cards)));
  }

  getMonsterCards(monster: string) {
    return JSON.parse(localStorage.getItem('monsterCards'))[monster] || {};
  }

  storeMonsterCards() {
    return this.http.get(`assets/monsters/cards.json`)
      .map( res => res );
  }

}