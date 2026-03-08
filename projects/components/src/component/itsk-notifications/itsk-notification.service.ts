import { inject, Injectable } from '@angular/core';
import { GtNotificationService } from '../gt-notifications/gt-notification.service';
import { ItskNotification } from './model/itsk-notification';
import { ItskNotificationLevel } from './model/itsk-notification-level.enum';

@Injectable({
  providedIn: 'root',
})
/** @deprecated Используй GtNotificationService */
export class ItskNotificationService {
  private readonly notificationService = inject(GtNotificationService);

  constructor() {}

  add(notification: ItskNotification) {
    if (notification) {
      this.notificationService.add({
        head: notification.head!,
        text: notification.text!,
        level: this.mapLevel(notification.level),
        duration: notification.infinite ? 0 : notification.duration ?? 10,
        iconName: notification.iconName,
      });
    }
  }

  addMultiple(notifications: ItskNotification[]) {
    if (notifications && notifications.length) {
      notifications.forEach((n) => {
        this.add(n);
      });
    }
  }

  clearMessages(name: string) {}

  private mapLevel(level: ItskNotificationLevel): 'error' | 'info' | 'success' | 'warn' {
    switch (level) {
      case ItskNotificationLevel.Error:
        return 'error';
      case ItskNotificationLevel.Warn:
        return 'warn';
      case ItskNotificationLevel.Success:
        return 'success';

      default:
        return 'info';
    }
  }
}
