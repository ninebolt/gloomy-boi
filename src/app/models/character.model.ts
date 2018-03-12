export class Character {
  type: string;
  name: string;
  initative: number;
  icon: string;

  constructor(type: string, name: string, icon: string, initative?: number) {
    this.type = type;
    this.name = name;
    this.icon = icon;
    this.initative = initative || 0;
  }
}

export class Monster extends Character {
  constructor(name: string, icon: string, initative?: number) {
    super('monster', name, icon, initative);
  }
}

export class Player extends Character {
  constructor(name: string, icon: string, initative?: number) {
    super('player', name, icon, initative);
  }
}