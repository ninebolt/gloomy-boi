import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ScenarioService } from '../../services/scenario.service';
import { Monster } from '../../models/character.model';

@Component({
  selector: 'monster-case',
  styleUrls: ['monster-case.component.scss'],
  template: `
    <div *ngFor="let m of consumableMonsters">
      <monster-band [monsterName]="m[0]" [monsters]="m[1]"></monster-band>
    </div>
  `
})
export class MonsterCaseComponent implements OnInit {

  consumableMonsters: any;
  private newMonster$: Subject<Monster[]>;
  private monsterMap: Map<string, Monster[]>;

  constructor(
    private scenarioService: ScenarioService
  ) {}

  ngOnInit() {
    this.monsterMap = new Map<string, Monster[]>();
    this.newMonster$ = this.scenarioService.getNewMonstersAdded();
    this.listenForNewMonsters();
  }

  private listenForNewMonsters() {
    this.newMonster$
      .subscribe((monsters: Monster[]) => {
        const monsterName = monsters[0].name;
        if (this.monsterMap.has(monsterName)) {
          console.log('TODO: Combine Monster Values');
        } else {
          this.monsterMap.set(monsterName, monsters);
        }
        this.createConsumableMonsters();
      });
  }

  createConsumableMonsters() {
    this.consumableMonsters = Array.from(this.monsterMap.entries());
  }
}