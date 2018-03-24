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
  ) { }

  ngOnInit() {
    this.basicCharacterInfo = this.characterService.getBasicMonsterInfo();
  }

  addCharacter(character: Character) {
    if (character.type === 'player') {
      this.scenarioService.addNewPlayer(character);
    } else {
      const monsters = this.characterService.createMonsters(character.name, 2, 1, character.image);
      this.scenarioService.addNewMonsters(monsters);
    }
  }
}