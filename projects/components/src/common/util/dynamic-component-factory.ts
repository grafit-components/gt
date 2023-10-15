import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  Renderer2, RendererFactory2,
  TemplateRef,
  Type
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ItskContentRef} from '../model/itsk-content-ref';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentFactory {
  private readonly container$: any;
  private renderer$: Renderer2;

  constructor(@Inject(DOCUMENT)
              private document$: any,
              private rendererFactory$: RendererFactory2,
              private componentFactoryResolver$: ComponentFactoryResolver,
              private appRef$: ApplicationRef) {
    this.container$ = this.document$.body;
    this.renderer$ = this.rendererFactory$.createRenderer(null, null);
  }

  createComponent<T>(component: Type<T>,
                     contentRef: ItskContentRef,
                     injector: Injector,
                     container?: any): ComponentRef<T> {
    container = container ? container : this.container$;
    const componentRef = this.componentFactoryResolver$
      .resolveComponentFactory(component)
      .create(injector, contentRef.nodes);
    this.appRef$.attachView(componentRef.hostView);
    container.appendChild(componentRef.location.nativeElement);
    return componentRef;
  }

  createContent(content: string | TemplateRef<any> | Type<any>, injector: Injector, context?: any): ItskContentRef {
    if (content === null || content === undefined) {
      throw new Error('Content is undefined');
    }
    if (typeof content === 'string') {
      return this.fromString(content);
    } else if (content instanceof TemplateRef) {
      return this.fromTemplate(content, context);
    } else {
      return this.fromComponent(content, injector, context);
    }
  }

  private fromString(content: string): ItskContentRef {
    return new ItskContentRef([[this.renderer$.createText(`${content}`)]]);
  }

  private fromTemplate(content: TemplateRef<any>, context: any): ItskContentRef {
    const viewRef = content.createEmbeddedView(context);
    this.appRef$.attachView(viewRef);
    return new ItskContentRef([viewRef.rootNodes], viewRef);
  }

  private fromComponent(content: any, injector: Injector, context: any): ItskContentRef {
    const componentFactory = this.componentFactoryResolver$.resolveComponentFactory<any>(content);
    const componentRef = componentFactory.create(injector);
    for (const key in context) {
      if (context.hasOwnProperty(key)) {
        componentRef.instance[key] = context.key;
      }
    }
    const componentNativeEl = componentRef.location.nativeElement;
    this.appRef$.attachView(componentRef.hostView);
    return new ItskContentRef([[componentNativeEl]], componentRef.hostView, componentRef);
  }
}
