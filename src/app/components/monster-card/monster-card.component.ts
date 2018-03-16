import { Component, Input} from '@angular/core';

@Component({
    selector: 'monster-card',
    styleUrls: ['monster-card.component.scss'],
    template: `
        <div class="card-back">
            <ng-content select=".card-name"></ng-content>
        </div>
        <div class="card-front">
            <ng-content select=".card-content"></ng-content>
        </div>
    `
})
export class MonsterCardComponent { }