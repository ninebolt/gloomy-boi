export class Card {
    cardType: string;
    deckOrder: number;
    icon: string;

    constructor(cardType: string, deckOrder: number, icon: string) {
        this.cardType = cardType;
        this.deckOrder = deckOrder;
        this.icon = icon;
    }
}

export class MonsterCard extends Card {
    title: string;
    body: string;

    constructor(title: string, deckOrder: number, icon: string, body: string) {
        super('MonsterCard', deckOrder, icon);
        this.title = title;
        this.body = body;
    }
}

export class CombatCard extends Card {
    constructor(deckOrder: number, icon: string) {
        super('CombatCard', deckOrder, icon);
    }
}