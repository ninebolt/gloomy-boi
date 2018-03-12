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
                    'send-to-back': c.facing === 'down',
                    'shuffle': this.shuffleDeck === true
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

    shuffleDeck: boolean = false;

    constructor() { }

    ngOnInit() {

        // generate some goofy test cards
        for (let i = 0; i < 10; i++) {
            let ord = Math.floor(Math.random() * 100);
            this.monsterCards.push(new MonsterCard('Flame Demon - 1', ord, 'icon ' + i.toString(), 'Some card description ' + i.toString()))
        }

        this.sortInOrder(this.monsterCards, 'order');

        // add in a test shuffle card
        this.monsterCards[5].shuffle = true;

        // console.log(this.monsterCards);
    }

    private cardClick(card) {
        if (card.shuffle === true) {
            for (let i = 0; i < 10; i++) {
                let ord = Math.floor(Math.random() * 100);
                this.monsterCards[i].order = ord;
                this.monsterCards[i].facing = 'down';
            }
            this.sortInOrder(this.monsterCards, 'order');
            this.shuffleDeck = true;
            setTimeout( () => {
                this.monsterCards[this.monsterCards.length - 1].facing = 'up';
                this.shuffleDeck = false;
            }, 600);
            // console.log(this.monsterCards);
        } else {
            if (card.facing === 'up') {
                card.facing = 'down';
                setTimeout( () => {
                    this.monsterCards.pop();
                    this.monsterCards.push(card);
                    this.monsterCards.unshift(this.monsterCards[this.monsterCards.length - 1]);
                    this.monsterCards.pop();
                    this.monsterCards[this.monsterCards.length - 1].facing = 'up';
                }, 0);
            } else {
                card.facing = 'up';
                this.monsterCards.pop();
                this.monsterCards.push(card);
            }
        }
    }

    public sortInOrder(cards, order) {
        return cards.sort(function(a, b) {
            var x = a[order]; var y = b[order];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
}