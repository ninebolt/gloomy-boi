import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CombatDeck } from '../../models/deck.model';
import { Card, CombatCard } from '../../models/card.model';

@Component({
    selector: 'combat-deck',
    styleUrls: ['combat-deck.component.scss'],
    template: `
      <div class="card-back"></div>
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
export class CombatDeckComponent implements OnInit {

    @Input() newRoundListener$: Observable<any>;

    deck: CombatDeck;
    activeCard: CombatCard;
    toFlip: boolean;
    showTwo = false;
    card1: string;
    card2: string;

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
    }

    drawTwo() {
      let card1: CombatCard, card2: CombatCard;

      this.toFlip = false;
      card1 = this.deck.drawCard() as CombatCard;
      card2 = this.deck.drawCard() as CombatCard;
      this.card1 = card1.value;
      this.card2 = card2.value;
      this.showTwo = true;

      this.checkForRemovableCards(card1);
      this.checkForRemovableCards(card2);

      this.toFlip = true;
    }

    resetDeck() {
      this.deck.resetDeck();
      this.shuffle();
    }

    flip() {
      // Flip over previous card, show current one
      // 🤔 to flip, or not to flip. that is the question
      this.toFlip = false;
      this.showTwo = false;
      this.checkForRemovableCards(this.activeCard);

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

    private checkForRemovableCards(card: CombatCard) {
      if (card && ['curse', 'bless'].includes(card.value)) {
        this.deck.removeCard(this.activeCard);
      }
    }
}
