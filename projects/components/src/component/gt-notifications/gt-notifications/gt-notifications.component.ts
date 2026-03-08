import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GtNotificationService } from '../gt-notification.service';
import { GtNotificationComponent } from '../gt-notification/gt-notification.component';

@Component({
  selector: 'gt-notifications',
  templateUrl: './gt-notifications.component.html',
  styleUrls: ['./gt-notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GtNotificationComponent, NgClass, AsyncPipe],
})
export class GtNotificationsComponent {
  private readonly notificationsService = inject(GtNotificationService);

  protected readonly notifications$ = this.notificationsService.notifications$;

  protected closeAll() {
    this.notificationsService.closeAll();
  }
}
