import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GtNotificationRef } from '@grafit/components';

@Component({
  selector: 'app-notification-progress',
  imports: [FormsModule],
  templateUrl: './notification-progress.component.html',
  styleUrl: './notification-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationProgressComponent {
  protected progress = 50;

  protected close() {
    // Закрытие уведомления через notificationRef
  }
}
