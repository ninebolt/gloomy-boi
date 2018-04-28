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
  private top: string;
  private left: string;
  @ViewChild('tooltipContainer') private tooltipContainer;

  constructor(@Inject('tooltipConfig') private config) { }

  ngOnInit() {
    const {top} = this.config.host.getBoundingClientRect();
    const {height} = this.tooltipContainer.nativeElement.getBoundingClientRect();
    const {left} = this.config.host.getBoundingClientRect();
    const {width} = this.config.host.getBoundingClientRect();
    this.top = `${top - height}px`;
    this.left = `${left - (width)}px`;
  }

}
