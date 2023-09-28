import {
  ComponentRef,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  TemplateRef,
  Type
} from '@angular/core';
import {DynamicComponentFactory} from '../../common/util/dynamic-component-factory';
import {ItskHintContainerComponent} from './itsk-hint-container/itsk-hint-container.component';
import {OverlayContainerService} from '../../common/service/overlay-container.service';
import {getRealPosition} from '../../util/dom-util';

@Directive({
  selector: '[itskHint]'
})
export class ItskHintDirective implements OnDestroy {
  @HostBinding('class.position-relative') relative = true;

  private instance$: ComponentRef<ItskHintContainerComponent> | null = null;
  @Input() itskHint?: string | TemplateRef<any> | Type<any>;
  @Input() itskHintClass?: string | string[];
  @Input() zIndex = 1;

  private readonly element$: HTMLElement;

  @HostListener('mouseenter') showHint() {
    if (this.itskHint === null || this.itskHint === undefined || this.itskHint === '') {
      return;
    }
    if (this.instance$ === null || this.instance$ === undefined) {
      this.instance$ = this.create(this.itskHint, this.injector$);
    }
  }

  @HostListener('mouseleave') hideHint() {
    this.destroy();
  }

  constructor(private elementRef$: ElementRef,
              private injector$: Injector,
              private factory$: DynamicComponentFactory,
              private overlay$: OverlayContainerService) {
    this.element$ = this.elementRef$.nativeElement;
  }

  ngOnDestroy() {
    this.destroy();
  }

  create(content: string | TemplateRef<any> | Type<any>,
         data?: any,
         injector?: Injector): ComponentRef<ItskHintContainerComponent> {
    if (content === null || content === undefined) {
      throw new Error('Specify template or component to render');
    }
    if (injector === null || injector === undefined) {
      injector = this.injector$;
    }
    const contentInstance = this.factory$.createContent(content, injector);
    const hint = this.factory$.createComponent(ItskHintContainerComponent,
      contentInstance,
      injector,
      this.overlay$.getContainer());
    const rect = getRealPosition(this.element$);
    if(this.itskHintClass)
    hint.instance.class = this.itskHintClass;
    hint.instance.zIndex = this.zIndex;
    hint.instance.bottom = window.innerHeight - rect.top;
    hint.instance.left = rect.left;
    hint.changeDetectorRef.detectChanges();
    return hint;
  }

  private destroy() {
    if (this.instance$) {
      this.instance$.destroy();
      this.instance$ = null;
    }
  }
}
