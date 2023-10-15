import {Injectable, Injector, TemplateRef, Type} from '@angular/core';
import {ItskModalConfig} from '../model/itsk-modal-config';
import {ItskCurrentModal} from '../model/itsk-current-modal';
import {ItskDynamicData} from '../../../common/model/itsk-dynamic-data';
import {ItskModalContainerComponent} from '../itsk-modal-container/itsk-modal-container.component';
import {ItskModalInstance} from '../model/itsk-modal-instance';
import {IModalResult} from '../model/imodal-result';
import {ItskModalCloseReason} from '../model/itsk-modal-close-reason.enum';
import {Subject} from 'rxjs';
import {DynamicComponentFactory} from '../../../common/util/dynamic-component-factory';

@Injectable({
  providedIn: 'root'
})
export class ItskModalService {
  private stack$: ItskModalInstance[] = [];
  private modalChanged$ = new Subject<undefined>();

  constructor(private injector$: Injector,
              private factory$: DynamicComponentFactory) {
    this.modalChanged$.subscribe(() => {
      if (this.stack$ && this.stack$.length > 0) {
        this.focus(this.stack$[this.stack$.length - 1]);
      }
    });
  }

  closeAll() {
    if (this.stack$ && this.stack$.length > 0) {
      this.stack$.forEach((instance: ItskModalInstance) => {
        instance.close({
          reason: ItskModalCloseReason.Exit
        });
      });
    }
  }

  any(): boolean {
    return this.stack$ && this.stack$.length > 0;
  }

  create(content: string | TemplateRef<any> | Type<any>,
         data?: any,
         config?: ItskModalConfig,
         injector?: Injector): ItskModalInstance {
    if (content === null || content === undefined) {
      throw new Error('Specify template or component to render');
    }
    if (config === null || config === undefined) {
      config = new ItskModalConfig();
    }
    if (injector === null || injector === undefined) {
      injector = this.injector$;
    }
    const currentModal = new ItskCurrentModal();
    const modalData = new ItskDynamicData(data);

    injector = this.getInjector(currentModal, modalData, injector);
    const contentInstance = this.factory$.createContent(content, injector, this.getContext(content, modalData, currentModal));
    const window = this.factory$.createComponent(ItskModalContainerComponent, contentInstance, injector);
    window.instance.config = config;

    const instance = new ItskModalInstance(window, contentInstance);
    currentModal.close = instance.close;
    this.register(instance);
    return instance;
  }

  private getContext(content: string | TemplateRef<any> | Type<any>, context: any, currentModal: ItskCurrentModal) {
    if (content instanceof TemplateRef) {
      return {
        $implicit: {
          modal: currentModal,
          ...context
        },
        close(result: IModalResult) {
          currentModal.close(result);
        }
      };
    }
    return context;
  }

  private getInjector(currentModal: ItskCurrentModal, data: ItskDynamicData, parent: Injector): Injector {
    return Injector.create({
      providers: [
        {
          provide: ItskCurrentModal,
          useValue: currentModal
        },
        {
          provide: ItskDynamicData,
          useValue: data
        }
      ],
      parent
    });
  }

  private register(instance: ItskModalInstance) {
    this.stack$.push(instance);
    this.modalChanged$.next(undefined);
    instance.onClose.subscribe(() => this.unregister(instance));
  }

  private unregister = (instance: ItskModalInstance) => {
    const index = this.stack$.indexOf(instance);
    if (index > -1) {
      this.stack$.splice(index, 1);
      this.modalChanged$.next(undefined);
    }
  };

  private focus(instance: ItskModalInstance) {
    if (instance && instance.window && instance.window.location.nativeElement) {
      setTimeout(() => {
        instance.window.location.nativeElement.focus();
      }, 0);
    }
  }
}



