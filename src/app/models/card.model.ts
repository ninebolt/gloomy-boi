export class Card {
    public faceUp: boolean = null;
    constructor(public type: string, public shuffle?: boolean) {
    }
}

export class MonsterCard extends Card {
    constructor(
        public monsterName: string,
        public monsterLevel: number,
        public content: string[],
        public initiative: number,
        public shuffle?: boolean) {
            super('MonsterCard', shuffle);
    }
}

export class CombatCard extends Card {
    constructor(public order: number, public icon: string, public discard?: boolean, public shuffle?: boolean) {
        super('CombatCard', shuffle);
    }
}
