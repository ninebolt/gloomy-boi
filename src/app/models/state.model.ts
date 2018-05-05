import { Deck } from "./deck.model";

export interface ScenarioState {
  players: Player[];
  monsters: Monster[];
  globalLevel: number;
}

export interface Player {
  name: string;
  image?: string;
  initative?: number;
}

export interface Monster {
  name: string;
  level?: number;
  deck?: Deck;
  attributes?: string[];
  maxAllowed?: number;
  image?: string;
  initative?: number;
  entities?: Entity[];
}

export interface Entity {
  id?: number;
  currentHealth?: number;
  maxHealth?: number;
  shield?: number;
  isElite?: boolean;
}

export interface NewMonster {
  id: number;
  status: string;
  disabled?: boolean;
}

export interface CharacterInitative {
  name: string;
  initative: number;
  image: string;
  type: string;
}

export interface Stats {
  attack: number,
  attributes: string[],
  health: number;
  move: number;
  range: number;
  shield: number;
}