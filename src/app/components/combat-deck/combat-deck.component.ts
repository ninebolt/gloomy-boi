import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
          [card]="activeCard"
          [showTwo]="showTwo"
          [advOne]="card1"
          [advTwo]="card2">
      </combat-card>
    `
})

export class CombatDeckComponent implements OnInit{

    @Input() newRoundListener$: Observable<any>;

    deck: CombatDeck;
    activeCard: CombatCard;
    private toFlip: boolean;
    private showTwo: boolean = false;
    private card1: string;
    private card2 : string;

    ngOnInit() {
      this.activeCard = new CombatCard(null, '');
      this.newRoundListener$
        .subscribe(() => {
          this.newRound();
        });
    }

    shuffle() {
      this.deck.shuffle();
      this.toFlip = false;
      this.showTwo = false;

      setTimeout(() => {
        this.activeCard = this.deck.drawCard() as CombatCard;
      }, 500);
    }

    drawTwo() {
      let card1: CombatCard, card2: CombatCard;

      this.toFlip = false;
      card1 = this.deck.drawCard() as CombatCard;
      card2 = this.deck.drawCard() as CombatCard;
      console.log(card1.value + ", " + card2.value);
      this.card1 = card1.value;
      this.card2 = card2.value;
      this.showTwo = true;

      this.toFlip = true;

      // this.activeCard = this.deck.drawCard() as CombatCard;
    }

    resetDeck() {
      this.deck.resetDeck();
      this.shuffle();
    }

    flip() {
      // Flip over previous card, show current one
      this.toFlip = false;
      this.showTwo = false;
      if (['curse', 'bless'].includes(this.activeCard.value)) {
        this.deck.removeCard(this.activeCard);
      }

      setTimeout(() => {
        this.activeCard = this.deck.drawCard() as CombatCard;
        this.deck.shuffleMe = this.deck.shuffleMe || this.activeCard.shuffle;
        this.toFlip = true;
      }, 500);
    }

    newRound() {
      if (this.deck.shuffleMe) {
        this.shuffle();
      }
    }
}
