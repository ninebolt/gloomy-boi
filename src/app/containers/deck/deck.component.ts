import { Component, OnInit, Input } from '@angular/core';
import { SlicePipe } from '@angular/common';

import { Deck } from "../../models/deck.model";
import { Card } from '../../models/card.model';

@Component({
    selector: 'deck',
    styleUrls: ['deck.component.scss'],
    template: `
        <monster-card *ngFor="let card of deck.cards|slice:deck.cards.length - 2"
            (click)="flip(card)"
            [ngClass]="{
                'flipped flip-to-front': card.faceUp === true,
                'send-to-back': card.faceUp === false
            }">
            <h2 *ngIf="card.type === 'MonsterCard'" class="card-name">{{card.monsterName}} - {{card.monsterLevel}}</h2>
            <p class="card-content" [innerHTML]="card.content.join('\n')"></p>
        </monster-card>
    `,
    providers: [SlicePipe]
})

export class DeckComponent implements OnInit{

    @Input() deck: Deck;

    ngOnInit() {}

    private flip(card: Card) {
        if (card.shuffle === true) {
            this.deck.shuffleMe = true;
        }
        if (card.faceUp === true) {
            card.faceUp = false;
            setTimeout( () => {
                this.deck.discardCard(card);
                this.deck.cards[this.deck.cards.length - 1].faceUp = true;
            }, 350);
        } else {
            card.faceUp = true;
        }
    }
}
