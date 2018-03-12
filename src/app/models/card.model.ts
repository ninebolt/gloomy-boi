export class Card {
    type: string;
    order: number;
    icon: string;
    facing: string = 'down';
    shuffle: boolean = false;

    constructor(type: string, order: number, icon: string, shuffle?: boolean, facing?: string) {
        this.type = type;
        this.order = order;
        this.icon = icon;
        this.shuffle = shuffle;
        this.facing = facing;
    }
}

export class MonsterCard extends Card {
    title: string;
    body: string;

    constructor(title: string, order: number, icon: string, body: string, shuffle?: boolean, facing?: string) {
        super('MonsterCard', order, icon, shuffle, facing);
        this.title = title;
        this.body = body;
    }
}

export class CombatCard extends Card {
    constructor(order: number, icon: string, shuffle?: boolean, facing?: string) {
        super('CombatCard', order, icon, shuffle, facing);
    }
}