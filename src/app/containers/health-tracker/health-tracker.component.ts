import { Component, OnInit } from '@angular/core';

import { Character, Player, Monster } from '../../models/character.model';

@Component({
  selector: 'health-tracker',
  styleUrls: ['health-tracker.component.scss'],
  template: `
      <div *ngFor="let c of monsters">
        <monster-health [monster]="c"></monster-health>
      </div>
  `
})

export class HealthTrackerComponent implements OnInit {
  monsters: Monster[];

  constructor() { }

  ngOnInit() { }
}