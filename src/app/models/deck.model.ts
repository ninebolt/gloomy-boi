import { Card, MonsterCard } from "./card.model"

export class Deck {
    private discardPile: Card[];

    public shuffleMe: boolean;

    constructor(public cards?: Card[]) {
        this.cards = cards || new Array<Card>();
        this.discardPile = new Array<Card>();
        this.shuffleMe = false;
    }

    insertCard(card: Card) {
        this.cards.push(card);
    }

    discardCard(card: Card) {
        this.discardPile.unshift(card)
        this.cards = this.cards.filter((c) => c !== card);
    }

    shuffle () {
        this.cards = [...this.cards, ...this.discardPile];
        for (let i = this.cards.length; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
}

// export class CombatDeck extends Deck {
//     super

// removeCard() {
//     this.cards.splice(
//         this.cards.findIndex((element) => {return element.type === name}
//     ), 1);
// }

// }

export class MonsterDeck extends Deck {
    constructor (cards?: MonsterCard[]) {
        super(cards)
    }
}
