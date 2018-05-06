import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Element } from '../../models/element.model';
import { RetrievalService } from '../../services/retrieval.service';

import { TooltipComponent } from '../../components/tooltip/tooltip.component';

@Component({
  selector: 'element-tracker',
  styleUrls: ['element-tracker.component.scss'],
  template: `
    <div class="element-tracker">
      <div class="title">
        <span>Element Tracker</span>
      </div>
      <div class="inert-elements">
        <div class="subtitle">Inert</div>
        <div class="elements-list">
          <div class="element-container" *ngFor="let el of elements; let i = index" [style.top.px]="el.top" [style.left.px]="el.left" (click)="shift(el, false)">
            <img [tooltip]="el.name" class="element" [src]="el.image"/>
          </div>
        </div>
      </div>
      <div class="waning-elements">
        <div class="subtitle">Waning</div>
      </div>
      <div class="strong-elements">
        <div class="strong">Strong</div>
      </div>
    </div>
  `
})
export class ElementTrackerComponent implements OnInit {

  elements: Element[] = [];
  @Input() newRoundListener$: Observable<any>;

  constructor(
    private r: RetrievalService
  ) { }

  ngOnInit() {
    this.r.getElements()
      .subscribe((el) => {
        this.elements = el
      });

    this.newRoundListener$
      .subscribe(() => {
        this.elements.forEach((el) => {
          this.shift(el, true);
        });
      });
  }

  shift(el: Element, newRound: boolean) {
    if (newRound && el.left < 130) {
      return;
    }
    el.left -= 130;
    if (el.left < 0) {
      el.left += 390;
    }
  }
}
