import { Component, Input} from '@angular/core';

@Component({
    selector: 'monster-card',
    styleUrls: ['monster-card.component.scss'],
    template: `
        <div class="card-back"></div>
        <div class="card-front">
            <h3 class="card-title">{{title}}</h3>
            <p class="card-icon">{{icon}}</p>
            <p class="card-body">{{body}}</p>
        </div>
    `
})
export class MonsterCardComponent {
    @Input() title: string;
    @Input() facing: string;
    @Input() order: number;
    @Input() icon: string;
    @Input() body: string;

    constructor() { }

}