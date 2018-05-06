import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { CharacterInitative } from '../../models/state.model';

@Component({
  selector: 'initative',
  styleUrls: ['initative.component.scss'],
  template: `
  <div class="character">
    <img class="icon" [ngClass]="character.type" [src]="character.image" />
    <span class="name" [ngClass]="{ 'red': character.name === 'Boss', 'blue': character.type === 'player'}">{{ character.name }}</span>
    <input class="initative" type="number" min="0" max="100" value="character.initative" [(ngModel)]="character.initative" (blur)="sortCards()" (focus)="character.initative = undefined" min="0" max="99" />
    <img (click)="deleteCharacter()" class="delete" [src]="cancelIcon" />
  </div>
  `
})
export class InitativeComponent implements OnInit {

  @Input() character: CharacterInitative;

  @Output() resort: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<CharacterInitative> = new EventEmitter();

  cancelIcon: string = 'assets/icons/cancel.png';

  ngOnInit() {
    if (!this.character.initative) {
      this.character.initative = 0;
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.resort.emit();
    }
  }

  sortCards() {
    this.resort.emit();
  }

  deleteCharacter() {
    this.delete.emit(this.character);
  }
}