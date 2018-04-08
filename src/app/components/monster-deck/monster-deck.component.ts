import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';

import { MonsterDeck } from "../../models/deck.model";
import { MonsterCard } from '../../models/card.model';

@Component({
  selector: 'monster-deck',
  styleUrls: ['monster-deck.component.scss'],
  template: `
      <div class="card-back"> </div>
      <monster-card (click)="flip()"
          [ngClass]="{
              'flipped flip-to-front': toFlip,
              'send-to-back': !toFlip
          }">
          <h2 class="card-name">{{activeCard.monsterName}} - {{activeCard.monsterLevel}}</h2>
          <div class="card-content">
            <h2 class="title">{{activeCard.monsterName}} - {{activeCard.monsterLevel}}</h2>
            <h2 class="initiative">{{activeCard.initiative}}</h2>
            <div class="line-row" #cardlines></div>
            <img *ngIf="activeCard.shuffle" class="shuffle icon" src="assets/icons/shuffle.png"/>
          </div>
      </monster-card>
    `
})

export class MonsterDeckComponent implements OnInit {

  @Input() deck: MonsterDeck;

  @ViewChild('cardlines') cardLines: ElementRef;

  private activeCard: MonsterCard;
  private toFlip: boolean;

  constructor() { }

  ngOnInit() {
    this.shuffle();
  }

  ngOnChanges() { }

  shuffle() {
    this.deck.shuffle();
    this.activeCard = this.deck.drawCard() as MonsterCard;
    this.toFlip = false;
  }

  private flip() {
    // Flip over previous card, show current one
    this.toFlip = false;

    setTimeout(() => {
      this.activeCard = this.deck.drawCard() as MonsterCard;
      this.cardLines.nativeElement.innerHTML = "";
      console.log(this.activeCard);
      this.activeCard.content.forEach(line => {
        this.cardLines.nativeElement.insertAdjacentHTML('beforeend', line);
      });
      this.toFlip = true;
    }, 500);

    this.deck.shuffleMe = this.deck.shuffleMe || this.activeCard.shuffle;
  }

  private newRound() {
    if (this.deck.shuffleMe) {
      this.shuffle();
      this.deck.shuffleMe = false;
    }
    this.flip();
  }
}
