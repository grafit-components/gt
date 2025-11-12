import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GtNotificationComponent } from '../gt-notification/gt-notification.component';
import { GtNotificationsService } from '../gt-notifications.service';

@Component({
  selector: 'gt-notifications',
  templateUrl: './gt-notifications.component.html',
  styleUrls: ['./gt-notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GtNotificationComponent, NgClass, AsyncPipe],
})
export class GtNotificationsComponent {
  private readonly notificationsService = inject(GtNotificationsService);

  protected readonly notifications$ = this.notificationsService.notifications$;

  protected closeAll() {
    this.notificationsService.closeAll();
  }
}
