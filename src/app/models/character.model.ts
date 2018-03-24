export class Character {
  type: string;
  name: string;
  initative: number;
  image: string;

  constructor(type: string, name: string, image: string, initative?: number) {
    this.type = type;
    this.name = name;
    this.image = image;
    this.initative = initative || 0;
  }
}

export class Monster extends Character {
  health: number;
  move: number;
  attack: number;
  range: number;
  elite: boolean;

  constructor(name: string, image: string,  elite?: boolean) {
    super('monster', name, image);
    this.elite = elite || false;
  }
}

export class Player extends Character {
  constructor(name: string, image: string, initative?: number) {
    super('player', name, image, initative);
  }
}