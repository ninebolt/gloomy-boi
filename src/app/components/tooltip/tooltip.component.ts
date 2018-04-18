import { Component, Input, ElementRef, ChangeDetectorRef, AfterViewInit,
  ViewChild, Inject, Directive } from "@angular/core";
import { TooltipDirective } from '../../directives/tooltip.directive';

@Directive({
  selector: '.tooltip-container'
})
export class TooltipContainerDirective {
}

@Component({
  styles: ['tooltip.component.scss'],
  template: `
    <div class="tooltip-container" [ngStyle]="{top: top}">
      <ng-content></ng-content>
    </div>
  `
})
export class TooltipComponent implements AfterViewInit {
  top: string;
  @ViewChild(TooltipContainerDirective, { read: ElementRef }) private tooltipContainer;

  constructor(@Inject('tooltipConfig') private config) { }

  ngAfterViewInit() {
    const {top} = this.config.host.getBoundingClientRect();
    const {height} = this.tooltipContainer.nativeElement.getBoundingClientRect();
    this.top = `${top - height}px`;
    console.log("Hello");
  }

}
