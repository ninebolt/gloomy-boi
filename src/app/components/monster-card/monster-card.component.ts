import { Component } from '@angular/core';

@Component({
    selector: 'monster-card',
    styleUrls: ['monster-card.component.scss'],
    template: `
        <div class="card-content">
            <h3 class="card-title">Test 1</h3>
            <p class="card-icon">icon</p>
            <p class="card-body">Body section 1</p>
        </div>
    `
})
export class MonsterCardComponent {

    constructor() {}
}