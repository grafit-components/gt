import { GtNotificationConfig } from './gt-notification.config';

/** Референс уведомления. */
export class GtNotificationRef {
  constructor(
    private closeFunc: (notificationRef: GtNotificationRef) => void,
    private redrawFunc: (notificationRef: GtNotificationRef) => void,
    public readonly config: GtNotificationConfig,
  ) {}

  /** Закрыть уведомление. */
  close() {
    this.closeFunc(this);
  }

  /** Перерисовать уведомление. */
  redraw() {
    this.redrawFunc(this);
  }
}
