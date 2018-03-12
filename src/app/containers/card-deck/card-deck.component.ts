import { Component } from '@angular/core';
import { MonsterCardComponent } from '../../components/monster-card/monster-card.component';

@Component({
    selector: 'card-deck',
    styleUrls: ['card-deck.component.scss'],
    template: `
        <monster-card></monster-card>
    `,
    host: { '(click)': 'onClick()'}
})

export class CardDeckComponent {

    constructor() {}

    private onClick() {
        
    }
}