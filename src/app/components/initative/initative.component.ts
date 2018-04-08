import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { CharacterInitative } from '../../models/state.model';

@Component({
  selector: 'initative',
  styleUrls: ['initative.component.scss'],
  template: `
  <div class="character">
    <img class="icon" [ngClass]="character.type" [src]="character.image" />
    <span class="name">{{ character.name }}</span>
    <input class="initative" type="number" min="0" max="100" value="character.initative" [(ngModel)]="character.initative" (blur)="sortCards()" min="0" max="99" />
  </div>
  `
})
export class InitativeComponent implements OnInit {

  @Input() character: CharacterInitative;

  @Output() resort: EventEmitter<any> = new EventEmitter();

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
}