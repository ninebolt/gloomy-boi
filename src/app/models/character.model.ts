export interface SimpleCharacter {
  name: string;
  maxAllowed?: number;
  type: string;
  image: string;
}

export class Character {
  constructor(
    public type: string,
    public name: string,
    public image: string,
    public initative?: number) {
    this.initative = initative || 0;
  }
}

export class Monster extends Character {
  constructor(
    public id: number,
    public name: string,
    public image: string,
    public health: number,
    public armor: number,
    public elite?: boolean,
    public status?: string[],
    public initative?: number) {
    super('monster', name, image, initative);
    this.initative = initative || 0;
    this.elite = elite || false;
  }
}

export class Player extends Character {
  constructor(
    public name: string,
    public image: string,
    public initative?: number) {
    super('player', name, image, initative);
    this.initative = initative || 0;
  }
}