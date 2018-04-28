import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
        <action-button placeholder="Search Classes" [searchTerms]="players" (selected)="playerSearched($event)">Add Player</action-button>
        <action-button placeholder="Search Monsters" [searchTerms]="monsters" (selected)="monsterSearched($event)">Add Monster</action-button>
        <button (click)="triggerNewRound()">New Round</button>
      </div>
    </div>
  `
})
export class ActionBarComponent implements OnInit {

  players: string[] = [];
  monsters: string[] = [];
  @Output('monsterSearched') monsterEmitter: EventEmitter<string> = new EventEmitter();
  @Output('playerSearched') playerEmitter: EventEmitter<string> = new EventEmitter();
  @Output() newRound: EventEmitter<any> = new EventEmitter();

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