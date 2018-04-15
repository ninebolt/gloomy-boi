import { Directive, HostListener, Input, ElementRef, OnDestroy, ComponentRef, Renderer2,
  Injector, ComponentFactoryResolver, ViewContainerRef, ReflectiveInjector } from "@angular/core";
import { TooltipComponent } from '../components/tooltip/tooltip.component';

@Directive({ selector: '[tooltip]' })
export class TooltipDirective implements OnDestroy {

  @Input('tooltip') text: string = '';
  private componentRef: ComponentRef<TooltipComponent>;

  constructor(private element: ElementRef,
    private renderer: Renderer2,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef) { }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.componentRef) {
      return;
    }
    const factory = this.resolver.resolveComponentFactory(TooltipComponent);
    const injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'tooltipConfig',
        useValue: {
          host: this.element.nativeElement
        }
      }
    ]);
    this.componentRef = this.vcr.createComponent(factory, 0, injector, [[this.renderer.createText(this.text)]]);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    this.componentRef && this.componentRef.destroy();
    this.componentRef = null;
  }

}
