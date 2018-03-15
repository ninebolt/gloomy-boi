import { Component, Input} from '@angular/core';
import { Character } from '../../models/character.model';

@Component({
  selector: 'action-button',
  styleUrls: ['action-button.component.scss'],
  template: `
    <button type="button" *ngIf="!selected" (click)="showInput()">
      <ng-content></ng-content>
    </button>
    <search-dropdown *ngIf="selected" [placeholder]="placeholder" (selected)="characterSelected($event)" (close)="hideInput()"></search-dropdown>
  `
})
export class ActionButtonComponent {

  @Input() placeholder = '';

  selected = false;

  characterSelected(character: Character) {
    console.log(character);
    this.hideInput();
  }

  showInput() {
    this.selected = true;
  }

  hideInput() {
    this.selected = false;
  }
}