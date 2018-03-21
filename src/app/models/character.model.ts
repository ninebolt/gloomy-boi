export class Character {
  constructor(
    public id: number,
    public type: string,
    public name: string,
    public icon: string,
    public health: number,
    public armor: number,
    public status: string[],
    public initative?: number) {
    this.initative = initative || 0;
  }
}

export class Monster extends Character {
  constructor(public id: number,
    public type: string,
    public name: string,
    public icon: string,
    public health: number,
    public armor: number,
    public status: string[],
    public initative?: number) {
    super(id, 'monster', name, icon, health, armor, status, initative);
    this.initative = initative || 0;
  }
}

export class Player extends Character {
  constructor(public id: number,
    public type: string,
    public name: string,
    public icon: string,
    public health: number,
    public armor: number,
    public status: string[],
    public initative?: number) {
    super(id, 'player', name, icon, health, armor, status, initative);
    this.initative = initative || 0;
  }
}