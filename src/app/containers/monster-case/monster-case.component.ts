import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ScenarioService } from '../../services/scenario.service';
import { Monster } from '../../models/character.model';

@Component({
  selector: 'monster-case',
  styleUrls: ['monster-case.component.scss'],
  template: `
    <div *ngFor="let m of monsters.entries()">
      <monster-band [monsterName]="m[0]" [monsters]="m[1]"></monster-band>
    </div>
  `
})
export class MonsterCaseComponent implements OnInit {

  monsters: Map<string, Monster[]>;
  private newMonster$: Subject<Monster[]>;

  constructor(
    private scenarioService: ScenarioService
  ) {}

  ngOnInit() {
    this.monsters = new Map<string, Monster[]>();
    this.newMonster$ = this.scenarioService.getNewMonstersAdded();
    this.listenForNewMonsters();
  }

  private listenForNewMonsters() {
    this.newMonster$
      .subscribe((monsters: Monster[]) => {
        const monsterName = monsters[0].name;
        if (this.monsters.has(monsterName)) {
          console.log('TODO: Combine Monster Values');
        } else {
          this.monsters.set(monsterName, monsters);
        }
      });
  }
}