import { Injectable } from '@angular/core';

import { CombatCard } from '../models/card.model';
import { CombatDeck } from '../models/deck.model';

import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CombatCardService {

  constructor(
    private http: HttpClient
  ) {
    this.storeCombatCards()
      .subscribe(cards => localStorage.setItem('combatCards', JSON.stringify(cards)));
  }

  storeCombatCards() {
    return this.http.get(`assets/cards/attack-modifiers/base-deck.json`)
      .map(res => res);
  }

  getCombatDeck() : CombatDeck {
    let deck = JSON.parse(localStorage.getItem('combatCards'));
    let combatDeck = [];
    deck.forEach(cardType => {
      for (let i = 0; i < cardType.amount; i++) {
        combatDeck.push(new CombatCard(cardType.value, cardType.image, false, cardType.shuffle));
      }
    });

    return new CombatDeck(combatDeck);
  }
}