import { Component, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Character, Player, Monster } from '../../models/character.model';

import * as rawCharacters from '../../../assets/characters.json';

@Component({
  selector: 'search-dropdown',
  styleUrls: ['search-dropdown.component.scss'],
  template: `
    <div class="search">
      <input #input type="text" [placeholder]="placeholder" [(ngModel)]="characterName">
      <div class="character-list">
        <div *ngFor="let c of characterList| nameFilter:characterName; let i = index;" class="character" (click)="characterSelected(c)">
          {{ c.name }}
        </div>
      </div>
    </div>
  `
})
export class SearchDropdownComponent implements OnInit {

  @ViewChild('input') inputComponent: ElementRef;

  @Input()
  placeholder: string = '';

  @Output()
  selected: EventEmitter<Character> = new EventEmitter();

  @Output()
  close: EventEmitter<any> = new EventEmitter();

  characterName: string;
  characterList: Character[];

  ngOnInit() {
    this.inputComponent.nativeElement.focus();
    this.characterList = [
      new Player(1, 'Character', rawCharacters[0].name, rawCharacters[0].icon, 11, 12, [], 70),
      new Monster(2, 'Character', rawCharacters[5].name, rawCharacters[5].icon, 11, 12, [], 52),
      new Monster(3, 'Character', rawCharacters[4].name, rawCharacters[4].icon, 11, 12, [], 24)
    ];
  }

  characterSelected(c: Character) {
    this.selected.emit(c);
  }

  exitComponent() {
    this.close.emit();
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 13 || event.keyCode === 27) {
      this.exitComponent();
    }
  }
}