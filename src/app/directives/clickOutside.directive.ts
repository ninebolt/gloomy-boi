import { Directive, ElementRef, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  constructor(private elementRef: ElementRef){}

  @Output()
  public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    if (!this.elementRef.nativeElement.contains(targetElement)) {
      this.clickOutside.emit(null);
    }
  }
}
