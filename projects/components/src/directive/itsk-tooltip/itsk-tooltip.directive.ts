import {ComponentRef, Directive, ElementRef, HostBinding, HostListener, Injector, Input, OnDestroy, TemplateRef, Type} from '@angular/core';
import {IItskTooltipConfig} from './model/i-itsk-tooltip-config';
import {DynamicComponentFactory} from '../../common/util/dynamic-component-factory';
import {ItskDynamicData} from '../../common/model/itsk-dynamic-data';
import {ItskTooltipContainerComponent} from './itsk-tooltip-container/itsk-tooltip-container.component';

@Directive({
  selector: '[itskTooltip]'
})
export class ItskTooltipDirective implements OnDestroy {
  @HostBinding('class.position-relative') relative = true;

  private instance$?: ComponentRef<ItskTooltipContainerComponent> | null;

  private content$?: string | TemplateRef<any> | Type<any>;

  @Input()
  set itskTooltip(value: string | TemplateRef<any> | Type<any> | undefined) {
    this.content$ = value;
  }

  get itskTooltip(): string | TemplateRef<any> | Type<any> | undefined {
    return this.content$;
  }

  @Input() itskTooltipData: any;

  @Input() itskTooltipConfig?: IItskTooltipConfig;

  private readonly element$: HTMLElement;

  @HostListener('click') showTooltip() {
    if (this.content$ && !this.instance$) {
      this.instance$ = this.create(this.content$, this.itskTooltipData, this.injector$);
      this.instance$.instance.destroyed.subscribe(() => {
        this.destroy();
      });
    }
  }

  constructor(private elementRef$: ElementRef,
              private injector$: Injector,
              private factory$: DynamicComponentFactory) {
    this.element$ = this.elementRef$.nativeElement;
  }

  ngOnDestroy() {
    this.destroy();
  }

  create(content: string | TemplateRef<any> | Type<any>,
         data?: any,
         injector?: Injector): ComponentRef<ItskTooltipContainerComponent> {
    if (content === null || content === undefined) {
      throw new Error('Specify template or component to render');
    }
    if (injector === null || injector === undefined) {
      injector = this.injector$;
    }
    const modalData = new ItskDynamicData(data);

    injector = this.getInjector(modalData, injector);
    const contentInstance = this.factory$.createContent(content, injector, this.getContext(content, modalData));
    const tooltip = this.factory$.createComponent(ItskTooltipContainerComponent, contentInstance, injector, this.element$);
    if (this.itskTooltipConfig)tooltip.instance.config = this.itskTooltipConfig;
    return tooltip;
  }

  private getContext(content: string | TemplateRef<any> | Type<any>, context: any) {
    if (content instanceof TemplateRef) {
      return {
        $implicit: context
      };
    }
    return context;
  }

  private getInjector(data: ItskDynamicData, parent: Injector): Injector {
    return Injector.create({
      providers: [
        {
          provide: ItskDynamicData,
          useValue: data
        }
      ],
      parent
    });
  }

  private destroy() {
    if (this.instance$) {
      this.instance$.destroy();
      this.instance$ = null;
    }
  }
}
