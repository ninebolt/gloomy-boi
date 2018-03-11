export class Character {
  characterType: string;
  name: string;
  initative: number;
  icon: string;

  constructor(characterType: string, name: string, icon: string, initative?: number) {
    this.characterType = characterType;
    this.name = name;
    this.icon = icon;
    this.initative = initative || 0;
  }
}

export class Monster extends Character {
  constructor(name: string, icon: string, initative?: number) {
    super('Monster', name, icon, initative);
  }
}

export class Player extends Character {
  constructor(name: string, icon: string, initative?: number) {
    super('Player', name, icon, initative);
  }
}