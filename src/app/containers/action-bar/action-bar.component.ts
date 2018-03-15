import { Component } from '@angular/core';

@Component({
  selector: 'action-bar',
  styleUrls: ['action-bar.component.scss'],
  template: `
    <div class="action-bar">
      <span class="name">Gloom Assistant</span>
      <div class="action-buttons">
        <action-button placeholder="Monster or Character">Add Character</action-button>
        <button>New Round</button>
      </div>
    </div>
  `
})
export class ActionBarComponent {
  constructor() {}
}