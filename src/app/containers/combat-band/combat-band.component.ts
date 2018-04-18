import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CombatDeck } from '../../models/deck.model';
import { CombatCard } from '../../models/card.model';

import { CombatCardService } from '../../services/combat-card.service';
import { CombatDeckComponent } from '../../components/combat-deck/combat-deck.component';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';

import 'rxjs/add/operator/map';

@Component({
  selector: 'combat-band',
  styleUrls: ['combat-band.component.scss'],
  template: `
    <div class="combat-band">
      <combat-deck [newRoundListener$]="newRoundListener$"></combat-deck>
      <div class="actions">
        <div tooltip="Add Curse" class="icon curse" (click)="addTempCard('curse')"></div>
        <div tooltip="Add Bless" class="icon bless" (click)="addTempCard('bless')"></div>
        <div tooltip="Shuffle" class="icon shuffle" (click)="shuffleDeck()"></div>
        <div tooltip="Draw Two" class="icon draw-two" (click)="drawTwo()"></div>
        <div tooltip="Reset Deck" class="icon reset-deck" (click)="resetDeck()"></div>
      </div>
    </div>
  `
})
export class CombatBandComponent implements OnInit {

  @Input() newRoundListener$: Observable<any>;
  @ViewChild(CombatDeckComponent) combatDeck: CombatDeckComponent;

  constructor(private combatCardService: CombatCardService) { }

  ngOnInit() {
    this.combatDeck.deck = this.combatCardService.getCombatDeck();
    this.combatDeck.shuffle();
  }

  addTempCard(type) {
    type === 'curse' ? this.combatDeck.deck.addCurse() : this.combatDeck.deck.addBless();
  }

  shuffleDeck() {
    this.combatDeck.shuffle();
  }

  drawTwo() {
    this.combatDeck.drawTwo();
  }

  resetDeck() {
    this.combatDeck.resetDeck();
  }

}
