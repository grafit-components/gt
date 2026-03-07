import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GtNotificationRef } from '@grafit/components';
import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-notification-progress',
  imports: [AsyncPipe],
  templateUrl: './notification-progress.component.html',
  styleUrl: './notification-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationProgressComponent {
  private readonly notificationRef = inject(GtNotificationRef);

  protected progress$ = interval(100).pipe(
    tap((process) => {
      if (process === 100) {
        console.log(process);
        this.close();
      }
    }),
  );

  protected close() {
    // Закрытие уведомления через notificationRef
    this.notificationRef.close();
  }
}
