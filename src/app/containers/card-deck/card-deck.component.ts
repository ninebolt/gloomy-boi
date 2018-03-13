import { Component, OnInit, Renderer2 } from '@angular/core';
import { MonsterCard } from '../../models/card.model';

@Component({
    selector: 'card-deck',
    styleUrls: ['card-deck.component.scss'],
    template: `
        <div *ngFor="let c of monsterCards" class="card-container">
            <monster-card (click)="cardClick(c)"
                [ngClass]="{
                    'flipped flip-to-front': c.facing === 'up',
                    'send-to-back': c.facing === 'down'
                }"
                [title]="c.title"
                [order]="c.order"
                [icon]="c.icon"
                [body]="c.body"
                [facing]="c.facing"
            ></monster-card>
        </div>
    `,
})

export class CardDeckComponent implements OnInit{

    monsterCards: MonsterCard[] = [];

    shuffleTrigger: boolean = false;

    constructor() { }

    ngOnInit() {

        // generate some gloomy test cards
        for (let i = 0; i < 10; i++) {
            let ord = Math.floor(Math.random() * 100);
            this.monsterCards.push(new MonsterCard('Flame Demon - 1', ord, 'icon ' + i.toString(), 'Some card description ' + i.toString()))
        }

        this.sortInOrder(this.monsterCards, 'order');

        // add in a test shuffle card
        this.monsterCards[5].shuffle = true;
    }

    private cardClick(card) {
        if (card.shuffle === true) {
            // TODO: what is this trigger used for
            this.shuffleTrigger = true;
        }
        if (card.facing === 'up') {
            // flip the first card down
            card.facing = 'down';
            // wait while the card animates
            setTimeout( () => {
                // send the top card to the back
                this.monsterCards.unshift(this.monsterCards[this.monsterCards.length - 1]);
                this.monsterCards.pop();
                // flip the top card
                this.monsterCards[this.monsterCards.length - 1].facing = 'up';
            }, 0);
        } else {
            // the deck is new, just flip the top card
            card.facing = 'up';
        }
    }

    public sortInOrder(cards, key) {
        return cards.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
}