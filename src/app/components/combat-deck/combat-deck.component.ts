import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { CombatDeck } from "../../models/deck.model";
import { Card, CombatCard } from '../../models/card.model';

@Component({
    selector: 'combat-deck',
    styleUrls: ['combat-deck.component.scss'],
    template: `
      <combat-card (click)="flip()"
          [ngClass]="{
              'flipped flip-to-front': toFlip,
              'send-to-back': !toFlip
          }"
          [card]="activeCard">
      </combat-card>
    `
})

export class CombatDeckComponent implements OnInit{

    deck: CombatDeck;
    private activeCard: CombatCard;
    private toFlip: boolean;

    constructor() {
      // Create blank card to squash errors
      this.activeCard = new CombatCard(null, '');
    }

    ngOnInit() {}

    ngOnChanges() {}

    shuffle() {
      this.deck.shuffle();
      this.toFlip = false;

      setTimeout(() => {
        this.activeCard = this.deck.drawCard() as CombatCard;
      }, 500);
    }

    drawTwo() {
      let card1: CombatCard, card2: CombatCard;

      this.toFlip = false;
      card1 = this.deck.drawCard() as CombatCard;
      card2 = this.deck.drawCard() as CombatCard;

      console.log(card1.value);
      console.log(card2.value);
      this.toFlip = true;

      this.activeCard = this.deck.drawCard() as CombatCard;
    }

    resetDeck() {
      this.deck.resetDeck();
      this.shuffle();
    }

    private flip() {
      // Flip over previous card, show current one
      this.toFlip = false;
      if (['curse', 'bless'].includes(this.activeCard.value)) {
        this.deck.removeCard(this.activeCard);
      }

      setTimeout(() => {
        this.activeCard = this.deck.drawCard() as CombatCard;
        this.toFlip = true;
      }, 500);

      this.deck.shuffleMe = this.deck.shuffleMe || this.activeCard.shuffle;
    }

    private newRound() {
      if (this.deck.shuffleMe) {
        this.shuffle();
        this.deck.shuffleMe = false;
      }
    }
}
