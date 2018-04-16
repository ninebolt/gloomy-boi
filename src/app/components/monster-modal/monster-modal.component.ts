import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Monster, NewMonster } from '../../models/state.model';

@Component({
  selector: 'monster-modal',
  styleUrls: ['monster-modal.component.scss'],
  template: `
    <div class="monster-modal" *ngIf="monster">
      <div class="monster-info">
        <div class="monster-name">
          <strong>Monster:</strong> {{ monster.name }}
        </div>
        <div class="monster-level">
          <strong>Level:</strong>
          <input [(ngModel)]="monster.level" type="number" min="0" max="7"/>
        </div>
      </div>
      <div class="monster-list">
        <div class="monster-row" *ngFor="let m of monsterList" [ngClass]="{ 'disabled' : m.disabled}">
          <span>ID {{ m.id }}</span>
          <div class="monster-buttons">
            <div>
              <input [(ngModel)]="m.status" [disabled]="m.disabled" type="radio" [name]="m.id" [id]="m.id + 'dead'" value="dead">
              <label [for]="m.id + 'dead'">Dead</label>
            </div>
            <div>
              <input [(ngModel)]="m.status" [disabled]="m.disabled" type="radio" [name]="m.id" [id]="m.id + 'normal'" value="normal">
              <label [for]="m.id + 'normal'">Normal</label>
            </div>
            <div>
              <input [(ngModel)]="m.status" [disabled]="m.disabled" type="radio" [name]="m.id" [id]="m.id + 'elite'" value="elite">
              <label [for]="m.id + 'elite'" class="elite">Elite</label>
            </div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button (click)="addMonster()">Add/Update Monsters</button>
        <button class="cancel" (click)="cancel()">Cancel</button>
      </div>
    </div>
  `
})
export class MonsterModalComponent implements OnInit {

  @Input() monster: Monster;
  @Output() addMonsters: EventEmitter<NewMonster[]> = new EventEmitter();
  @Output('cancel') cancelAction: EventEmitter<void> = new EventEmitter();
  monsterList: NewMonster[] = [];

  ngOnInit() {
    this.populateMonsterList(this.monster);
    if (!this.monster.level) {
      this.monster.level = 1;
    }
  }

  populateMonsterList(monster: Monster) {
    for (var i = 1; i <= monster.maxAllowed; i++) {
      this.monsterList.push({ id: i, status: 'dead', disabled: false });
    }
    if (monster.entities) {
      monster.entities.forEach((m) => {
        this.monsterList[m.id - 1].status = m.isElite ? 'elite' : 'normal';
        this.monsterList[m.id - 1].disabled = true;
      });
    }
  }

  addMonster() {
    this.monsterList = this.monsterList.filter((m) => m.disabled === false && m.status !== 'dead');
    this.addMonsters.emit(this.monsterList);
  }

  cancel() {
    this.cancelAction.emit();
  }
}