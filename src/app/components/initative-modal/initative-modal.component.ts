import { Component, Input, Output, EventEmitter, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
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
          <input #initative class="initative" type="number" min="0" max="100" value="character.initative" [(ngModel)]="character.initative" min="0" max="99" />
        </div>
      </div>
      <div class="buttons">
        <button (click)="startNewRound()" class="new-round">New Round</button>
        <button class="cancel" (click)="close()">Cancel</button>
      </div>
    </div>
  `
})
export class InitativeModalComponent implements OnInit, AfterViewInit {

  @Input() initatives: CharacterInitative[];
  @Output() complete: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  @ViewChildren('initative')  inputs : QueryList<ElementRef>;

  ngOnInit() {
    if (this.initatives) {
      this.initatives = this.initatives.filter((p) => p.type === 'player');
      this.initatives.forEach((p) => p.initative = undefined);
    }
  }

  ngAfterViewInit() {
    if (this.inputs.length > 0) {
      this.inputs.first.nativeElement.focus();
    }
  }

  startNewRound() {
    if (this.initatives) {
      this.initatives.forEach((p) => {
        if (!p.initative) {
          p.initative = 0;
        }
      });
    }
    this.complete.emit();
  }

  close() {
    this.cancel.emit();
  }
}