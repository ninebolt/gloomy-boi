import { Card, MonsterCard, CombatCard } from "./card.model"

export class Deck {
  discardPile: Card[];

  public shuffleMe: boolean;

  constructor(protected cards?: Card[]) {
    this.cards = cards || new Array<Card>();
    this.discardPile = new Array<Card>();
    this.shuffleMe = false;
  }

  insertCard(card: Card) {
    this.cards.push(card);
  }

  getRemainingCards() {
    return this.cards.length;
  }

  drawCard() {
    if (this.cards[0].discardMe) {
      this.discardCard(this.cards[0]);
    }
    if (this.cards.length <= 0) {
      this.shuffle();
      console.log("Out of cards; reshuffling");
    }
    this.cards[0].discardMe = true;
    return this.cards[0];
  }

  discardCard(card: Card) {
    card.discardMe = false;
    this.discardPile.unshift(card)
    this.cards = this.cards.filter((c) => c !== card);
  }

  shuffle() {
    let tempDeck = this.cards.concat(this.discardPile);
    for (let i = tempDeck.length - 1; i > 1; i--) {
      let j = Math.floor(Math.random() * (i - 1));
      [tempDeck[i], tempDeck[j]] = [tempDeck[j], tempDeck[i]];
    }
    tempDeck.forEach(card => card.discardMe = false);
    this.shuffleMe = false;
    this.cards = tempDeck;
    this.discardPile = [];
  }
}

export class CombatDeck extends Deck {
  private numBlesses = 0;
  private numCurses = 0;

  constructor(protected cards?: CombatCard[]) {
    super(cards);
  }

  addBless() {
    if (this.numBlesses < 10) {
      let pos = Math.floor(Math.random() * this.cards.length);
      let blessCard = new CombatCard("bless", "assets/cards/attack-modifiers/full-cards/attack-card-front-bless.png", true, false);
      this.cards.splice(pos, 0, blessCard);
      this.numBlesses++;
    } else {
      console.log("Max number of blesses reached");
    }
  }

  getBlesses() {
    return this.numBlesses;
  }

  addCurse() {
    if (this.numCurses < 10) {
      let pos = Math.floor(Math.random() * this.cards.length);
      let curseCard = new CombatCard("curse", "assets/cards/attack-modifiers/full-cards/attack-card-front-curse.png", true, false);
      this.cards.splice(pos, 0, curseCard);
      this.numCurses++;
    } else {
      console.log("Max number of curses reached");
    }
  }

  getCurses() {
    return this.numCurses;
  }

  // Override base method in order to handle curses and blesses
  discardCard(card: CombatCard) {
    card.discardMe = false;
    this.cards = this.cards.filter((c) => !Object.is(c, card));

    if (card && !['curse', 'bless'].includes(card.value)) {
      this.discardPile.unshift(card)
    } else {
      card.value === "bless" ? this.numBlesses-- : card.value === "curse" ? this.numCurses-- : null;
    }
  }

  resetDeck() {
    this.cards = this.cards.filter(card => {
      let combatCard = card as CombatCard;
      return !["curse", "bless"].includes(combatCard.value);
    });
    this.numCurses = 0;
    this.numBlesses = 0;
  }
}

export class MonsterDeck extends Deck {
  constructor(protected cards?: MonsterCard[]) {
    super(cards);
  }
}
