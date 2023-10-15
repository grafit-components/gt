import {Injectable} from '@angular/core';
import {ItskNotification} from './model/itsk-notification';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItskNotificationService {
  private _notifications = new Subject<ItskNotification>();
  private _clear = new Subject<string>();

  notifications: Observable<ItskNotification>;
  clear: Observable<string>;

  constructor() {
    this.notifications = this._notifications.asObservable();
    this.clear = this._clear.asObservable();
  }

  add(notification: ItskNotification) {
    if (notification) {
      this._notifications.next(notification);
    }
  }

  addMultiple(notifications: ItskNotification[]) {
    if (notifications && notifications.length) {
      notifications.forEach((n) => {
        this._notifications.next(n);
      });
    }
  }

  clearMessages(name: string) {
    this._clear.next(name);
  }
}
