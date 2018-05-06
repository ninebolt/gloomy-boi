import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RetrievalService } from '../../services/retrieval.service';

@Component({
  selector: 'action-bar',
  styleUrls: ['action-bar.component.scss'],
  template: `
    <div class="action-bar">
      <div class="name">
        Gloomy Boy
      </div>
      <div class="action-buttons">
        <div class="globalLevel">
          <span>Global Level</span>
          <input type="number" min="0" max="7" [(ngModel)]="globalLevel" (change)="globalLevelEmitter.emit(globalLevel)" />
        </div>
        <button (click)="this.resetEmitter.emit()" class="reset">Reset</button>
        <action-button placeholder="Search Classes" [searchTerms]="players" (selected)="playerSearched($event)">Add Player</action-button>
        <action-button placeholder="Search Monsters" [searchTerms]="monsters" (selected)="monsterSearched($event)">Add Monster</action-button>
        <button (click)="triggerNewRound()" class="new-round">New Round</button>
      </div>
    </div>
  `
})
export class ActionBarComponent implements OnInit {

  players: string[] = [];
  monsters: string[] = [];
  @Input() globalLevel: number = 1;
  @Output('monsterSearched') monsterEmitter: EventEmitter<string> = new EventEmitter();
  @Output('playerSearched') playerEmitter: EventEmitter<string> = new EventEmitter();
  @Output() newRound: EventEmitter<any> = new EventEmitter();
  @Output('reset') resetEmitter: EventEmitter<void> = new EventEmitter();
  @Output('globalLevel') globalLevelEmitter: EventEmitter<number> = new EventEmitter();

  constructor (
    private retrieve: RetrievalService
  ) { }

  ngOnInit() {
    this.retrieve.getMonsterNames()
      .subscribe((monster) => {
        this.monsters.push(monster);
      });

    this.retrieve.getPlayerNames()
      .subscribe((playableClass) => {
        this.players.push(playableClass);
      })
  }

  monsterSearched(name: string) {
    this.monsterEmitter.emit(name);
  }

  playerSearched(name: string) {
    this.playerEmitter.emit(name);
  }

  triggerNewRound() {
    this.newRound.emit();
  }
}
