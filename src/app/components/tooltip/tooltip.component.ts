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
    // console.log(this.tooltipContainer.nativeElement.offsetLeft +  " "
    //   + this.tooltipContainer.nativeElement.offsetHeight +  " "
    //   + this.tooltipContainer.nativeElement.offsetWidth +  " "
    //   + this.tooltipContainer.nativeElement.offsetTop);
    // console.log(this.config.host.getBoundingClientRect());
    // console.log(this.tooltipContainer.nativeElement.getBoundingClientRect());
    // const {top} = this.config.host.getBoundingClientRect();
    // const {height} = this.tooltipContainer.nativeElement.getBoundingClientRect();
    // const {left} = this.config.host.getBoundingClientRect();
    const top = this.tooltipContainer.nativeElement.offsetTop;
    const height = this.tooltipContainer.nativeElement.offsetHeight;
    const left = this.tooltipContainer.nativeElement.offsetLeft;
    const width = this.tooltipContainer.nativeElement.offsetWidth;
    const topOffset = top - (this.tooltipContainer.nativeElement.getBoundingClientRect().y - this.config.host.getBoundingClientRect().y) - (height);
    const leftOffset = left - (this.tooltipContainer.nativeElement.getBoundingClientRect().x - this.config.host.getBoundingClientRect().x);

    // const {width} = this.tooltipContainer.nativeElement.getBoundingClientRect();
    this.top = `${topOffset}px`;
    this.left = `${leftOffset}px`;
  }

}
