import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GtNotificationConfig } from './gt-notification.config';
import { GtNotificationRef } from './gt-notification.ref';
import { GtNotificationsComponent } from './gt-notifications/gt-notifications.component';

/** Сервис для работы с уведомлениями. */
@Injectable({ providedIn: 'root' })
export class GtNotificationsService {
  private overlay = inject(Overlay);
  private injector = inject(Injector);

  private readonly notificationsSubject = new BehaviorSubject<GtNotificationRef[]>([]);

  readonly notifications$ = this.notificationsSubject.asObservable();

  constructor() {
    this.initNotificationsContainer();
  }

  /**
   * Добавить уведомление
   *
   * @param config Конфигурация уведомления
   */
  add(config: GtNotificationConfig): GtNotificationRef {
    const configCopy = { ...config };
    configCopy.level = configCopy.level ?? 'info';
    configCopy.duration = configCopy.duration ?? 10;

    const notificationRef = new GtNotificationRef(this.close.bind(this), this.redraw.bind(this), configCopy);

    const notifications = this.notificationsSubject.value;
    notifications.push(notificationRef);
    this.redraw(notificationRef);
    return notificationRef;
  }

  /** Закрыть все уведомления */
  closeAll() {
    this.notificationsSubject.next([]);
  }

  private close(notificationRef: GtNotificationRef) {
    const notifications = this.notificationsSubject.value;
    const index = notifications.indexOf(notificationRef);
    if (index > -1) {
      notifications.splice(index, 1);
      this.redraw();
    }
  }

  private redraw(notificationRef?: GtNotificationRef) {
    const notifications = this.notificationsSubject.value;
    if (notificationRef) {
      const duration = notificationRef.config.duration;
      if (duration) {
        setTimeout(() => notificationRef.close(), 1000 * duration);
      }
    }
    this.notificationsSubject.next(notifications);
  }

  private initNotificationsContainer() {
    const overlayRef = this.overlay.create();
    const componentInjector = Injector.create({
      providers: [
        {
          provide: GtNotificationsService,
          useValue: this,
        },
      ],
      parent: this.injector,
    });
    const notificationContainer = new ComponentPortal(GtNotificationsComponent, undefined, componentInjector);
    overlayRef.attach(notificationContainer);
  }
}
