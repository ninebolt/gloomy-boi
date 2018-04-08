import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'monster-modal',
  styleUrls: ['monster-modal.component.scss'],
  template: `
    <div class="monster-modal">
      <div class="monster-info">
        <div class="monster-name">
          <strong>Monster:</strong> {{ name }}
        </div>
        <div class="monster-level">
          <strong>Level:</strong>
          <input [(ngModel)]="level" type="number" min="0" max="7"/>
        </div>
      </div>
      <div class="monster-adder">
        <div *ngFor="let i of potentialMonsters">
          Hi
        </div>
      </div>
    </div>
  `
})
export class MonsterModalComponent implements OnInit {

  @Input() name: string = 'Bandit Archer';
  @Input() level: number;
  @Input() maxAllowed: number = 5;

  potentialMonsters: number[];
  monsterType: string = 'normal';
  monsters: any[] = [];

  monsterForm = this.fb.group({
    monsterNumber: [0, Validators.required],
    monsterType: ['', Validators.required]
  });

  constructor (
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (!this.level) {
      this.level = 0;
    }
    this.potentialMonsters = Array.apply(null, {length: this.maxAllowed}).map(Function.call, Number);
    this.monsterForm.patchValue({ 'monsterNumber': 1 });
    this.monsterForm.patchValue({ 'monsterType': 'normal' });
  }

  changeMonsterType(e: boolean) {
    this.monsterType = e ? 'elite' : 'normal';
    this.monsterForm.patchValue({ 'monsterType': this.monsterType });
  }

  addMonster() {
    this.monsters.push(this.monsterForm.value());
    this.monsterForm.patchValue({
      'monsterNumber': 1,
      'monsterType': 'normal'
    });
  }
}