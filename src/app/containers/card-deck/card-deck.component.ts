import { Component, OnInit } from '@angular/core';

import { MonsterDeck } from "../../models/deck.model";
import { MonsterCard } from '../../models/card.model';

@Component({
    selector: 'card-deck',
    styleUrls: ['card-deck.component.scss'],
    template: `
        <div *ngFor="let card of monsterDeck.cards;let i = index;" class="card-container">
            <monster-card *ngIf="i > monsterDeck.cards.length - 4"
                (click)="flip(card)"
                [ngClass]="{
                    'flipped flip-to-front': card.faceUp === true,
                    'send-to-back': card.faceUp === false
                }">
                <h2 class="card-name">{{card.monsterName}} - {{card.monsterLevel}}</h2>
                <p class="card-content">{{card.content}}</p>
            </monster-card>
        </div>
    `
})

export class CardDeckComponent implements OnInit{

    monsterDeck: MonsterDeck = new MonsterDeck([]);

    constructor() { }

    ngOnInit() {

        // generate some gloomy test cards

        for (let i = 0; i < 10; i++) {
            this.monsterDeck.insertCard(
                new MonsterCard(
                    'Bandit Archer',
                    4,
                    ['<h1>Some title here</h1><p>body content here</p>', '<p>more body content here'],
                    false
                )
            )
        }

        console.table(this.monsterDeck.cards);

        // add in a test shuffle card
        this.monsterDeck.cards[5].shuffle = true;
    }

    private flip(card: MonsterCard) {
        if (card.shuffle === true) {
            this.monsterDeck.shuffleMe = true;
        }
        if (card.faceUp === true) {
            card.faceUp = false;
            setTimeout( () => {
                this.monsterDeck.discardCard(card);
                this.monsterDeck.cards[this.monsterDeck.cards.length - 1].faceUp = true;
            }, 350);
        } else {
            card.faceUp = true;
        }
    }
}
