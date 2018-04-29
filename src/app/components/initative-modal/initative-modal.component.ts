import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CharacterInitative } from '../../models/state.model';

@Component({
  selector: 'initative-modal',
  styleUrls: ['initative-modal.component.scss'],
  template: `
    <div class="modal-background" (click)="close()"></div>
    <div class="initative-modal">
      <div class="title">
        Enter New Round Initatives
      </div>
      <div class="initative-container" *ngFor="let character of initatives">
        <div class="character">
          <img class="icon" [ngClass]="character.type" [src]="character.image" />
          <span class="name">{{ character.name }}</span>
          <input class="initative" type="number" min="0" max="100" value="character.initative" [(ngModel)]="character.initative" (blur)="sortCards()" min="0" max="99" />
        </div>
      </div>
      <div class="buttons">
        <button (click)="startNewRound()">New Round</button>
        <button class="cancel" (click)="close()">Cancel</button>
      </div>
    </div>
  `
})
export class InitativeModalComponent implements OnInit {

  @Input() initatives: CharacterInitative[];
  @Output() complete: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    if (this.initatives) {
      this.initatives = this.initatives.filter((p) => p.type === 'player');
      this.initatives.forEach((p) => p.initative = 0);
    }
  }

  startNewRound() {
    this.complete.emit();
  }

  close() {
    this.cancel.emit();
  }
}