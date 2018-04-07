import { Component, OnInit } from '@angular/core';
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
        <action-button placeholder="Search Classes" [searchTerms]="players">Add Player</action-button>
        <action-button placeholder="Search Monsters" [searchTerms]="monsters">Add Monster</action-button>
        <button>New Round</button>
      </div>
    </div>
  `
})
export class ActionBarComponent implements OnInit {

  players: string[] = [];
  monsters: string[] = [];

  constructor (
    private retrieve: RetrievalService
  ) { }

  ngOnInit() {
    this.retrieve.getMonsterNames()
      .subscribe((monster) => {
        this.monsters.push(monster);
      });

    this.retrieve.getPlayableClassNames()
      .subscribe((playableClass) => {
        this.players.push(playableClass);
      })
  }
}