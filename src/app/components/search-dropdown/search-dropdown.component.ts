import { Component, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Character, Player, Monster } from '../../models/character.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'search-dropdown',
  styleUrls: ['search-dropdown.component.scss'],
  template: `
    <div class="search">
      <input #input type="text" [placeholder]="placeholder" [(ngModel)]="characterName">
      <div class="character-list">
        <div *ngFor="let c of searchTerms | nameFilter:characterName; let i = index;" class="character" (click)="characterSelected(c)">
          {{ c.name }}
        </div>
      </div>
    </div>
  `
})
export class SearchDropdownComponent implements OnInit {

  @ViewChild('input') inputComponent: ElementRef;

  @Input() placeholder: string = '';
  @Input('searchTerms') searchTerms:any;

  @Output()
  selected: EventEmitter<Character> = new EventEmitter();

  @Output()
  close: EventEmitter<any> = new EventEmitter();

  characterName: string;
  characterList: Character[];

  ngOnInit() {
    this.inputComponent.nativeElement.focus();
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