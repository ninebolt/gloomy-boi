export class Card {
    public discardMe: boolean = false;
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
    constructor(
        public value: string,
        public icon: string,
        public discard?: boolean,
        public shuffle?: boolean) {
        super('CombatCard', shuffle);
    }
}