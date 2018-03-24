import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Observable } from 'rxjs/Observable';
import { ScenarioService } from '../../services/scenario.service';
import { Character } from '../../models/character.model';

@Component({
  selector: 'action-bar',
  styleUrls: ['action-bar.component.scss'],
  template: `
    <div class="action-bar">
      <span class="name">Gloom Assistant</span>
      <div class="action-buttons">
        <action-button placeholder="Monster or Character" [searchTerms]="basicCharacterInfo" (characterEmitter)="addCharacter($event)">Add Character</action-button>
        <button>New Round</button>
      </div>
    </div>
  `
})
export class ActionBarComponent implements OnInit {

  basicCharacterInfo: any;

  constructor(
    private characterService: CharacterService,
    private scenarioService: ScenarioService
  ) {
    console.log(characterService.getMonster('Bandit Archer'));
  }

  ngOnInit() {
    this.basicCharacterInfo = this.characterService.getBasicMonsterInfo();
  }

  addCharacter(monster: Character) {
    const monsters = this.characterService.createMonsters(monster.name, 2, 1, monster.image);
    this.scenarioService.addNewMonsters(monsters);
  }
}