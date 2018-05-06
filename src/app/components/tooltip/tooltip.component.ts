import { Component, Input, ElementRef, ChangeDetectorRef, OnInit,
  ViewChild, Inject, Directive } from "@angular/core";
import { TooltipDirective } from '../../directives/tooltip.directive';

@Component({
  styleUrls: ['tooltip.component.scss'],
  template: `
    <div class="tooltip" [ngStyle]="{top: top, left: left}" #tooltipContainer>
      <ng-content></ng-content>
    </div>
  `
})
export class TooltipComponent implements OnInit {
  top: string;
  left: string;
  @ViewChild('tooltipContainer') private tooltipContainer;

  constructor(@Inject('tooltipConfig') private config) { }

  ngOnInit() {
    const top = this.tooltipContainer.nativeElement.offsetTop;
    const height = this.tooltipContainer.nativeElement.offsetHeight;
    const left = this.tooltipContainer.nativeElement.offsetLeft;
    const topOffset = top - (this.tooltipContainer.nativeElement.getBoundingClientRect().y - this.config.host.getBoundingClientRect().y) - (height);
    const leftOffset = left - (this.tooltipContainer.nativeElement.getBoundingClientRect().x - this.config.host.getBoundingClientRect().x);

    this.top = `${topOffset}px`;
    this.left = `${leftOffset}px`;
  }

}
